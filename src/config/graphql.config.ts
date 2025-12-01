import { ConfigService } from '@nestjs/config';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { isDev } from '@common/utils/is-dev.util';
import { join } from 'node:path';
import { GqlContext } from '@common/types/gql-context.type';

export function getGraphQLConfig(
  configService: ConfigService,
): ApolloDriverConfig {
  return {
    playground: isDev(configService),
    path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    context: ({ req, res }: GqlContext) => ({ req, res }),
  };
}
