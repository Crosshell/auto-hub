import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(email: string, hashPassword: string): Promise<User> {
    const user = this.userRepository.create({ email, password: hashPassword });
    return this.userRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(user: User, input: UpdateUserInput): Promise<User> {
    this.userRepository.merge(user, input);
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
