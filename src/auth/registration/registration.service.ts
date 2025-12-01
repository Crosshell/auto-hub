import { Injectable } from '@nestjs/common';
import { RegisterInput } from './dto/register.input';
import { UserService } from '../user/user.service';
import { EmailService } from '../../email/email.service';
import { RedisService } from '../../redis/redis.service';
import { randomUUID } from 'crypto';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly redis: RedisService,
  ) {}

  async register(input: RegisterInput): Promise<boolean> {
    const user = await this.userService.create(input);

    const token = randomUUID();

    await this.redis.setex(`verify:${token}`, 86400, user.id);

    await this.emailService.sendVerificationEmail(user.email, token);

    return true;
  }

  async verifyEmail(token: string): Promise<boolean> {
    const userId = await this.redis.get(`verify:${token}`);

    if (!userId) return false;

    await this.userService.markEmailVerified(userId);
    await this.redis.del(`verify:${token}`);

    return true;
  }
}
