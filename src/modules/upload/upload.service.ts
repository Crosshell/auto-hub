import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3: S3Client;
  private readonly bucket: string;

  constructor(private readonly config: ConfigService) {
    this.bucket = this.config.getOrThrow<string>('AWS_S3_BUCKET');

    this.s3 = new S3Client({
      region: this.config.getOrThrow('AWS_REGION'),
      credentials: {
        accessKeyId: this.config.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.config.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async uploadFile(
    buffer: Buffer,
    filename: string,
    mimetype: string,
    folder: string,
  ): Promise<string> {
    const key = `${folder}/${randomUUID()}-${filename}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: buffer,
        ContentType: mimetype,
      }),
    );

    return `https://${this.bucket}.s3.amazonaws.com/${key}`;
  }

  async deleteFile(url: string): Promise<void> {
    const key = url.split('.com/')[1];
    if (!key) return;

    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }
}
