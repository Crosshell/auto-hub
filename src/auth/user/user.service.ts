import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UserEntity } from './entities/user.entity';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    readonly userRepository: Repository<UserEntity>,
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
      throw new ConflictException('Username already exists');
    }

    const existingByEmail = await this.userRepository.findOne({
      where: { email },
    });
    if (existingByEmail) {
      throw new ConflictException('Email already exists');
    }

    const user = this.userRepository.create({
      username,
      email,
      password: await hash(password),
    });

    return this.userRepository.save(user);
  }
}
