import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewCommentInput {
  @Field(type => Number)
  commentId: number;

  @Field(type => String)
  author?: string;

  @Field(type => String)
  content?: string;

  @Field(type => String)
  status: string;
}