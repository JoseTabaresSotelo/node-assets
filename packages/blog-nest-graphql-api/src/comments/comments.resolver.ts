import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CommentsGuard } from './comments.guard';
import { CommentsService } from './comments.service';
import { Comment } from './comments.model';
import { NewCommentInput } from './comment.input';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

const pubSub = new PubSub();

@Resolver(of => Comment)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService  
  ) {}

  @Query(returns => [Comment])
  @UseGuards(CommentsGuard)
  async getComments() {
    return this.commentsService.findAll();
  }

  @Query(returns => Comment)
  async findCommentById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<Comment> {
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

  @Mutation(returns => Comment)
  async removeComment(@Args('id') id: number) {
    return this.commentsService.remove(id);
  }

  @ResolveField((of) => User)
  user(@Parent() comment: Comment) {
  //  return { __typename: 'User', userId: comment.author };
    return {
      userId: "1",
      userName: "nug",
      firstName: "Daniel",
      lastName: "Gonzalez",
      email: "userone@test.com",
      userStatus: "active",
      createdAt: "2024-03-21T06:00:00.000Z",
      updatedAt: "2024-03-21T06:00:00.000Z"
    }
  }
}
