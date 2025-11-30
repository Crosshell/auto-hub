import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { hash } from '@common/utils';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(email: string, password: string): Promise<User> {
    const userExists = await this.findOneByEmail(email);
    if (userExists) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashPassword = await hash(password);

    return this.repository.create(email, hashPassword);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.repository.findOneByEmail(email);
  }

  async findOneById(id: string): Promise<User | null> {
    return this.repository.findOneById(id);
  }

  async update(id: string, input: UpdateUserInput): Promise<User> {
    const user = await this.repository.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.repository.update(user, input);
  }

  async delete(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (!result.affected) {
      throw new NotFoundException('User not found');
    }
  }
}
