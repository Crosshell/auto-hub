import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByIdOrThrow(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByLoginOrThrow(login: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [{ username: login }, { email: login }],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(input: CreateUserInput): Promise<User> {
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

  async findByEmailOrThrow(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async markEmailVerified(id: string): Promise<void> {
    await this.update(id, { isEmailVerified: true });
  }

  async update(id: string, input: DeepPartial<User>): Promise<User> {
    let user = await this.findOneByIdOrThrow(id);
    user = this.userRepository.merge(user, input);
    return await this.userRepository.save(user);
  }
}
