import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/categories/categories.model';
import { User } from 'src/users/users.model';
import { Comment } from 'src/comments/comments.model';

@ObjectType({ description: 'post' })
export class Post {
  @Field(type => ID)
  postId: number;

  @Field(type => String)
  postTitle: string;

  @Field(type => String)
  postDescription: string;

  @Field(type => Int)
  categoryFkId: number;

  @Field(type => Int)
  commentFkId: number;

  @Field(type => Int)
  userFkId: number;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  createdAt: Date;

  @Field((type) => [Comment], { nullable: 'items' }) 
  comments?: Comment[];

  @Field((type) => Category, { nullable: true }) 
  category?: Category;

  @Field((type) => User, { nullable: true }) 
  user?: User;
}