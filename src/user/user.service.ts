import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { hash } from '@common/utils';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async createUser(email: string, password: string): Promise<User> {
    const userExists = await this.getUserByEmail(email);
    if (userExists) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashPassword = await hash(password);

    return this.repository.createUser(email, hashPassword);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.repository.getUserByEmail(email);
  }
}
