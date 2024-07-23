import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewCategoryInput {
  @Field(type => String)
  @MaxLength(20)
  categoryName: string;

  @Field(type => String)
  @MaxLength(200)
  categoryDescription: string;
  
  @Field(type => String)
  categoryStatus: string;
}
