import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestWithUser } from '../../shared/types/request-with-user.type';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const { req } = gqlCtx.getContext<{ req: RequestWithUser }>();

    const userId = req.session?.userId;
    if (!userId) {
      throw new UnauthorizedException('User not authorized');
    }

    if (!req.user) {
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      req.user = user;
    }

    return true;
  }
}
