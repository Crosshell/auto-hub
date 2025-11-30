import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { Request } from 'express';
import { User } from '../user/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private service: AuthService) {}

  @Mutation(() => User)
  async register(@Args('input') input: RegisterInput): Promise<User> {
    return this.service.register(input);
  }

  @Mutation(() => User)
  async login(
    @Args('input') input: LoginInput,
    @Context() context: { req: Request },
  ): Promise<User> {
    const user = await this.service.login(input);

    context.req.session.userId = user.id;

    return user;
  }
}
