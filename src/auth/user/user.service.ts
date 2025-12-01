import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UserEntity } from './entities/user.entity';
import { hash, verify } from 'argon2';
import { UpdateProfileInput } from './dto/update-profile.input';
import { ChangePasswordInput } from '../registration/change-password.input';
import { randomUUID } from 'crypto';
import { RedisService } from '../../redis/redis.service';
import { EmailService } from '../../email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly emailService: EmailService,
    private readonly redis: RedisService,
  ) {}

  async findById(id: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByLogin(login: string): Promise<UserEntity | null> {
    return this.userRepository.findOne({
      where: [{ username: login }, { email: login }],
    });
  }

  async create(input: CreateUserInput): Promise<UserEntity> {
    const { username, email, password } = input;

    const existingByUsername = await this.userRepository.findOne({
      where: { username },
    });
    if (existingByUsername) {
      throw new ConflictException('Username already in use');
    }

    const existingByEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingByEmail) {
      throw new ConflictException('Email already in use');
    }

    const user = this.userRepository.create({
      username,
      email,
      password: await hash(password),
    });

    return this.userRepository.save(user);
  }

  async markEmailVerified(id: string): Promise<void> {
    await this.userRepository.update(id, { isEmailVerified: true });
  }

  async updateProfile(
    id: string,
    dto: UpdateProfileInput,
  ): Promise<UserEntity> {
    let user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    user = this.userRepository.merge(user, dto);
    return await this.userRepository.save(user);
  }

  async changePassword(id: string, dto: ChangePasswordInput): Promise<boolean> {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, dto.oldPassword);
    if (!isValid) throw new BadRequestException('Invalid password');

    const newHash = await hash(dto.newPassword);

    await this.userRepository.update(id, { password: newHash });

    return true;
  }

  async requestEmailChange(id: string, newEmail: string): Promise<boolean> {
    const existing = await this.userRepository.findOne({
      where: { email: newEmail },
    });
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

    await this.userRepository.update(userId, {
      email: newEmail,
      isEmailVerified: true,
    });

    await this.redis.del(`change_email:${token}`);
    return true;
  }
}
