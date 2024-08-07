import { Directive, Field, ID, ObjectType, ResolveField } from '@nestjs/graphql';
import { capitalizeMiddleware } from 'src/common/middlewares/capitalize.middleware';
import { User } from 'src/users/users.model';

@ObjectType({ description: 'comment' })
export class Comment {
  @Field(type => ID)
  commentId: number;
  
  @Directive('@upper')
  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
  
  @Field(type => ID)
  author?: number;

  @Field((type) => User, { nullable: true })
  user?: User;
}
  
/**
  type Comment {
    commentId: ID!
    content: String
    status: String
    createdAt: DateTime
    updatedAt: DateTime
    author: ID!
    user: User
  }
 */
