import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CatsModule } from './cats/cats.module';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { CommentsModule } from './comments/comments.module';
import { DbModule } from './db/db.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    CatsModule,
    CommentsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // autoSchemaFile: true,
      driver: ApolloDriver,
      playground: false,
      typePaths: ['./**/*.graphql'],
      transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
      installSubscriptionHandlers: true,
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql')
      plugins: [
        ApolloServerPluginLandingPageLocalDefault()
      ]
    }),
    DbModule,
  ],
})
export class AppModule {}
