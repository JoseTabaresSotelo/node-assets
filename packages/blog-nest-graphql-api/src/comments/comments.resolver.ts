import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Cat } from '../graphql.schema';
import { CommentsGuard } from './comments.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

const pubSub = new PubSub();

@Resolver('Comment')
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query('comments')
  @UseGuards(CommentsGuard)
  async getComments() {
    return this.commentsService.findAll();
  }

  @Query('comment')
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
