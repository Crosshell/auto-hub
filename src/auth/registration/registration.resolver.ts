import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { RegisterInput } from './dto/register.input';
import { RegistrationService } from './registration.service';

@Resolver()
export class RegistrationResolver {
  constructor(private readonly registrationService: RegistrationService) {}

  @Mutation(() => Boolean)
  async register(@Args('input') input: RegisterInput) {
    return this.registrationService.register(input);
  }

  @Mutation(() => Boolean)
  async verifyEmail(@Args('token') token: string) {
    return this.registrationService.verifyEmail(token);
  }
}
