import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { UserEntity } from '../user/entities/user.entity';
import { verify } from 'argon2';
import type { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';

@Injectable()
export class SessionService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async login(req: Request, input: LoginInput): Promise<UserEntity> {
    const { login, password } = input;

    const user = await this.userService.findByLogin(login);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { isEmailVerified } = user;
    if (!isEmailVerified) {
      throw new UnauthorizedException('Email not verified');
    }

    const isValidPassword = await verify(user.password, password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    return await new Promise<UserEntity>((resolve, reject) => {
      req.session.userId = user.id;
      req.session.createdAt = new Date().toISOString();

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
    return await new Promise<boolean>((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          return reject(
            new InternalServerErrorException('Error destroying session'),
          );
        }

        const sessionName =
          this.configService.getOrThrow<string>('SESSION_NAME');

        req.res?.clearCookie(sessionName);
        resolve(true);
      });
    });
  }
}
