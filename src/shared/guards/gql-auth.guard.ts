import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserEntity } from '../../auth/account/entities/user.entity';
import { Repository } from 'typeorm';
import { RequestWithUser } from '../types/request-with-user.type';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<{ req: RequestWithUser }>().req;

    const userId = request.session.userId;

    if (!userId) {
      throw new UnauthorizedException('User not authorized');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.user = user;

    return true;
  }
}
