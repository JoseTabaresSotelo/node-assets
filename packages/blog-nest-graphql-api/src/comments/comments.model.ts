import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'comment' })
export class Comment {
  @Field(type => ID)
  id: string;

  @Field(type => String)
  author?: string;

  @Field({ nullable: true })
  content?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  creationDate: Date;
}
  