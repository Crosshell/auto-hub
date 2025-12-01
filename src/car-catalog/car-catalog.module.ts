import { Module } from '@nestjs/common';
import { GenerationResolver } from './car-generation/generation.resolver';
import { MakeResolver } from './car-make/make.resolver';
import { ModelResolver } from './car-model/model.resolver';
import { ModificationResolver } from './car-modification/modification.resolver';

@Module({
  providers: [
    GenerationResolver,
    MakeResolver,
    ModelResolver,
    ModificationResolver,
  ],
})
export class CarCatalogModule {}
