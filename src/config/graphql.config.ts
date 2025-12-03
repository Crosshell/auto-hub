import { ConfigService } from '@nestjs/config';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { isDev } from '../shared/utils/is-env.util';
import { join } from 'node:path';
import { GqlContext } from '../shared/types/gql-context.type';

export function getGraphQLConfig(
  configService: ConfigService,
): ApolloDriverConfig {
  return {
    playground: isDev(configService),
    path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
    autoSchemaFile: join(process.cwd(), 'schema.gql'),
    sortSchema: true,
    context: ({ req, res }: GqlContext) => ({ req, res }),
  };
}
