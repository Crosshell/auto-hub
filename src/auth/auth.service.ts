import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { UserService } from '../user/user.service';
import { compare } from '@common/utils';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async register(input: RegisterInput): Promise<User> {
    return this.userService.create(input.email, input.password);
  }

  async login(input: LoginInput): Promise<User> {
    return await this.validateCredentials(input);
  }

  async validateCredentials(input: LoginInput): Promise<User> {
    const user = await this.userService.findOneByEmail(input.email);

    const isValid = user && (await compare(input.password, user.password));
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
