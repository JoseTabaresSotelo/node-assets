import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewCommentInput {
  @Field(type => Number)
  id: number;

  @Field(type => String)
  // @MaxLength(30)
  author?: string;

  @Field(type => String)
  //@IsOptional()
  // @Length(30, 255)
  content?: string;

  @Field(type => Number)
  status: number;
}