import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CommentsGuard } from './comments.guard';
import { CommentsService } from './comments.service';
import { Comment } from './comments.model';

const pubSub = new PubSub();

@Resolver(of => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(returns => [Comment])
  @UseGuards(CommentsGuard)
  async getComments() {
    return this.commentsService.findAll();
  }

  @Query(returns => Comment)
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<any> {
    return this.commentsService.findOneById(id);
  }

//   @Mutation('createComments')
//   async create(@Args('createCatInput') args: CreateCommentDto): Promise<Cat> {
//     const createdCat = await this.catsService.create(args);
//     pubSub.publish('catCreated', { catCreated: createdCat });
//     return createdCat;
//   }

//   @Subscription('commentCreated')
//   catCreated() {
//     return pubSub.asyncIterator('commentCreated');
//   }
}



// @Resolver(of => Recipe)
// export class RecipesResolver {
//   constructor(private readonly recipesService: RecipesService) {}

//   @Query(returns => Recipe)
//   async recipe(@Args('id') id: string): Promise<Recipe> {
//     const recipe = await this.recipesService.findOneById(id);
//     if (!recipe) {
//       throw new NotFoundException(id);
//     }
//     return recipe;
//   }

//   @Query(returns => [Recipe])
//   recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
//     return this.recipesService.findAll(recipesArgs);
//   }

//   @Mutation(returns => Recipe)
//   async addRecipe(
//     @Args('newRecipeData') newRecipeData: NewRecipeInput,
//   ): Promise<Recipe> {
//     const recipe = await this.recipesService.create(newRecipeData);
//     pubSub.publish('recipeAdded', { recipeAdded: recipe });
//     return recipe;
//   }

//   @Mutation(returns => Boolean)
//   async removeRecipe(@Args('id') id: string) {
//     return this.recipesService.remove(id);
//   }

//   @Subscription(returns => Recipe)
//   recipeAdded() {
//     return pubSub.asyncIterator('recipeAdded');
//   }
// }
