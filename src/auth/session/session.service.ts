import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginInput } from './inputs/login.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../account/entities/user.entity';
import { Repository } from 'typeorm';
import { verify } from 'argon2';
import type { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {}

  async login(req: Request, input: LoginInput): Promise<UserEntity> {
    const { login, password } = input;

    const user = await this.userRepository.findOne({
      where: [{ username: login }, { email: login }],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    return new Promise((resolve, reject) => {
      req.session.createdAt = new Date();
      req.session.userId = user.id;

      req.session.save((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException('Error saving session'),
          );
        }

        resolve(user);
      });
    });
  }

  async logout(req: Request): Promise<boolean> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException('Error destroying session'),
          );
        }

        req.res?.clearCookie(
          this.configService.getOrThrow<string>('SESSION_NAME'),
        );
        resolve(true);
      });
    });
  }
}
