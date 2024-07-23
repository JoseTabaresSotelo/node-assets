import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewCommentInput {
  @Field(type => ID)
  author?: number;

  @Field(type => String)
  @MaxLength(300)
  content?: string;

  @Field(type => String)
  status: string;
}