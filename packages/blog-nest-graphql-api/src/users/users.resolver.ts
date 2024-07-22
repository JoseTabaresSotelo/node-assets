import { ParseIntPipe, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { UsersGuard } from "./users.guard";
import { UsersService } from "./users.service";
import { User } from "./users.model";
import { NewUserInput } from "./users.input";

const pubSub = new PubSub();

@Resolver((of) => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query((returns) => [User])
  @UseGuards(UsersGuard)
  async getUsers() {
    return this.usersService.findAll();
  }

  @Query((returns) => User)
  async findUserById(
    @Args("id", ParseIntPipe)
    id: number
  ): Promise<any> {
    return this.usersService.findOneById(id);
  }

  @Mutation((returns) => User)
  async addUser(
    @Args("newCommentData") newCommentData: NewUserInput
  ): Promise<Comment> {
    const comment = await this.usersService.create(newCommentData);
    pubSub.publish("commentAdded", { commentAdded: comment });

    return comment;
  }

  @Mutation((returns) => User)
  async updateUser(
    @Args("id", ParseIntPipe) id: number,
    @Args("updateCommentData") newCommentData: NewUserInput
  ): Promise<Comment> {
    const comment = await this.usersService.update(id, newCommentData);

    return comment;
  }

  @Mutation((returns) => Boolean)
  async removeUser(@Args("id") id: number) {
    return this.usersService.remove(id);
  }
}
