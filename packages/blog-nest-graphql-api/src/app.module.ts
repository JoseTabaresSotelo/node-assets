import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CatsModule } from './cats/cats.module';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { CommentsModule } from './comments/comments.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    CatsModule,
    CommentsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // autoSchemaFile: true,
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
    }),
    DbModule,
  ],
})
export class AppModule {}
