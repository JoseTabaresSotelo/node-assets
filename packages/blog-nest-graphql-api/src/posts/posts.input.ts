import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewPostInput {
  @Field(type => String)
  @MaxLength(20)
  postTitle: string;

  @Field(type => String)
  @MaxLength(200)
  postDescription: string;

  @Field(type => Int)
  categoryFkId: number;

  @Field(type => Int)
  commentFkId: number;

  @Field(type => Int)
  userFkId: number;
}
