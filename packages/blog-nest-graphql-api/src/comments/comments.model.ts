import { Directive, Field, ID, ObjectType, ResolveField } from '@nestjs/graphql';
import { capitalizeMiddleware } from 'src/common/middlewares/capitalize.middleware';

@ObjectType({ description: 'comment' })
export class Comment {
  @Field(type => ID)
  commentId: string;

  @Field(type => String)
  author?: string;
  
  @Directive('@upper')
  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  creationAt: Date;
}
  