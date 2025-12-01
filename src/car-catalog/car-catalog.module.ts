import { Module } from '@nestjs/common';
import { GenerationResolver } from './resolvers/generation.resolver';
import { MakeResolver } from './resolvers/make.resolver';
import { ModelResolver } from './resolvers/model.resolver';
import { ModificationResolver } from './resolvers/modification.resolver';

@Module({
  providers: [
    GenerationResolver,
    MakeResolver,
    ModelResolver,
    ModificationResolver,
  ],
})
export class CarCatalogModule {}
