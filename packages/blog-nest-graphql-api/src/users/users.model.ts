import { Directive, Field, ID, ObjectType, ResolveField } from '@nestjs/graphql';
import { capitalizeMiddleware } from 'src/common/middlewares/capitalize.middleware';

@ObjectType({ description: 'user' })
export class User {
  @Field(type => ID)
  userId: string;

  @Field(type => String)
  userName: string;

  @Field(type => String)
  firstName: string;
  
  @Field(type => String)
  lastName: string;

  @Field(type => String)
  email: string;

  @Field(type => String)
  psw: string;

  @Field(type => String)
  userStatus: string;

  @Field({ nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt: Date;
}
  