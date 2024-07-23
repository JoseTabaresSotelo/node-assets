import { Field, ID, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field(type => String)
  @MaxLength(20)
  userName: string;

  @Field(type => String)
  @MaxLength(30)
  firstName: string;
  
  @Field(type => String)
  @MaxLength(50)
  lastName: string;

  @Field(type => String)
  email: string;

  @Field(type => String)
  psw: string;

  @Field(type => String)
  userStatus: string;
}
