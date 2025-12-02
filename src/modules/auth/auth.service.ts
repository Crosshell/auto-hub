import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterInput } from './dto/register.input';
import { randomUUID } from 'crypto';
import { UserService } from '../user/user.service';
import { EmailService } from '../email/email.service';
import { RedisService } from '../redis/redis.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { hash, verify } from 'argon2';

@Injectable()
export class AuthService {
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

  async changePassword(id: string, dto: ChangePasswordInput): Promise<boolean> {
    const user = await this.userService.findOneByIdOrThrow(id);

    const isValid = await verify(user.password, dto.oldPassword);
    if (!isValid) throw new BadRequestException('Invalid password');

    const newHash = await hash(dto.newPassword);

    await this.userService.update(id, { password: newHash });

    return true;
  }

  async requestEmailChange(id: string, newEmail: string): Promise<boolean> {
    const existing = await this.userService.findByEmailOrThrow(newEmail);

    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const token = randomUUID();
    await this.redis.setex(`change_email:${token}`, 3600, `${id}:${newEmail}`);

    await this.emailService.sendVerificationEmail(newEmail, token);

    return true;
  }

  async verifyNewEmail(token: string): Promise<boolean> {
    const data = await this.redis.get(`change_email:${token}`);
    if (!data) return false;

    const [userId, newEmail] = data.split(':');

    await this.userService.update(userId, {
      email: newEmail,
      isEmailVerified: true,
    });

    await this.redis.del(`change_email:${token}`);
    return true;
  }
}
