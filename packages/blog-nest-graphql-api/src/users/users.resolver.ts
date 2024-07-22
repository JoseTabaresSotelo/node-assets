import { ParseIntPipe, UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PubSub } from "graphql-subscriptions";
import { UsersGuard } from "./users.guard";
import { UsersService } from "./users.service";
import { User } from "./users.model";
import { NewUserInput } from "./users.input";
import { CommentsService } from "src/comments/comments.service";

const pubSub = new PubSub();

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly commentsService: CommentsService,
  ) {}

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
    @Args("newUserData") newUserData: NewUserInput
  ): Promise<Comment> {
    const user = await this.usersService.create(newUserData);
    // pubSub.publish("userAdded", { userAdded: user });

    return user;
  }

  @Mutation((returns) => User)
  async updateUser(
    @Args("id", ParseIntPipe) id: number,
    @Args("updateUserData") newUserData: NewUserInput
  ): Promise<User> {
    const user = await this.usersService.update(id, newUserData);

    return user;
  }

  @Mutation((returns) => Boolean)
  async removeUser(@Args("id") id: number) {
    return this.usersService.remove(id);
  }

  @ResolveField((of) => [Comment])
  comments(@Parent() user: User): Comment[] {
    const { userId } = user;
    const comments = this.commentsService.findAllByAuthorId(+userId);

    return comments;
  }
}
