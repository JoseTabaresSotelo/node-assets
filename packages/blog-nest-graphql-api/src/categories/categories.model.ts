import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'category' })
export class Category {
  @Field(type => ID)
  categoryId: number;

  @Field(type => String)
  categoryName: string;

  @Field(type => String)
  categoryDescription: string;
  
  @Field(type => String)
  categoryStatus: string;

  @Field({ nullable: true })
  updatedAt: Date;

  @Field({ nullable: true })
  createdAt: Date;

  // @Field((type) => [Comment], { nullable: 'items' }) 
  // comments?: Comment[];
}
  
/**
  type Category {
    categoryId: ID!
    categoryName: String!
    categoryDescription: String!
    categoryStatus: String!
    updatedAt: DateTime
    createdAt: DateTime
  }
 */