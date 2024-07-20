import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CommentsGuard } from './comments.guard';
import { CommentsService } from './comments.service';
import { Comment } from './comments.model';
import { NewCommentInput } from './comment.input';

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

  @Mutation(returns => Comment)
  async addComment(
    @Args('newCommentData') newCommentData: NewCommentInput,
  ): Promise<Comment> {
    const comment = await this.commentsService.create(newCommentData);
    pubSub.publish('commentAdded', { commentAdded: comment });

    return comment;
  }

  @Mutation(returns => Comment)
  async updateComment(
    @Args('id', ParseIntPipe) id: number,
    @Args('updateCommentData') newCommentData: NewCommentInput,
  ): Promise<Comment> {
    const comment = await this.commentsService.update(id, newCommentData);

    return comment;
  }

  @Mutation(returns => Boolean)
  async removeComment(@Args('id') id: number) {
    return this.commentsService.remove(id);
  }
}

