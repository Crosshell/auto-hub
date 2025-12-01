import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './inputs/create-user.input';
import { UserEntity } from './entities/user.entity';
import { hash } from 'argon2';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(UserEntity)
    readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(input: CreateUserInput): Promise<boolean> {
    const { username, email, password } = input;

    const isUsernameExists = await this.userRepository.findOne({
      where: { username },
    });

    if (isUsernameExists) {
      throw new ConflictException('Username already exists');
    }

    const isEmailExists = await this.userRepository.findOne({
      where: { email },
    });

    if (isEmailExists) {
      throw new ConflictException('Email already exists');
    }

    const user = this.userRepository.create({
      username,
      email,
      password: await hash(password),
    });

    await this.userRepository.save(user);

    return true;
  }
}
