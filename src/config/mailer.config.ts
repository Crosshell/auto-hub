import { ConfigService } from '@nestjs/config';
import type { MailerOptions } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export function getMailerConfig(configService: ConfigService): MailerOptions {
  return {
    transport: {
      service: configService.getOrThrow<string>('EMAIL_SERVICE'),
      auth: {
        user: configService.getOrThrow<string>('EMAIL_USER'),
        pass: configService.getOrThrow<string>('EMAIL_PASS'),
      },
    },
    defaults: {
      from: `"AutoHub" <no-reply@gmail.com>`,
    },
    template: {
      dir: join(process.cwd(), 'dist', 'modules', 'email', 'templates'),
      adapter: new HandlebarsAdapter(),
      options: {
        strict: true,
      },
    },
  };
}
