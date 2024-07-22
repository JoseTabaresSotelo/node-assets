import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { CommentsModule } from './comments/comments.module';
import { DbModule } from './db/db.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { loggerMiddleware } from './common/middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { CommentsService } from './comments/comments.service';
import { CommentsResolver } from './comments/comments.resolver';
import { UsersService } from './users/users.service';
import { UsersResolver } from './users/users.resolver';

@Module({
  imports: [
    // CommentsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: 'schema.gql',
      driver: ApolloDriver,
      playground: false,
      // typePaths: ['./**/*.graphql'],
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: false,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql')
      plugins: [
        ApolloServerPluginLandingPageLocalDefault()
      ],
      buildSchemaOptions: {
        fieldMiddleware: [loggerMiddleware],
      },
    }),
    DbModule,
  ],
  providers: [
    CommentsService, 
    CommentsResolver, 
    UsersService, 
    UsersResolver
  ],
})
export class AppModule {}
