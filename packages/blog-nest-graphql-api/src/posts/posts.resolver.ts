import { ParseIntPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NewPostInput } from "./posts.input";
import { PostService } from "./posts.service";
import { Post } from "./posts.model";

@Resolver((of) => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Query((returns) => [Post])
  async getPosts() {
    return this.postService.findAll();
  }

  @Query((returns) => Post)
  async findPostById(
    @Args("id", ParseIntPipe)
    id: number
  ) {
    return this.postService.findOneById(id);
  }

  @Mutation((returns) => Post)
  async addPost(
    @Args("newPostData") newPostData: NewPostInput
  ): Promise<any> {
    return await this.postService.create(newPostData);
  }

  @Mutation((returns) => Post)
  async updatePost(
    @Args("id", ParseIntPipe) id: number,
    @Args("updatePostData") newPostData: NewPostInput
  ): Promise<any> {
    return await this.postService.update(id, newPostData);
  }

  @Mutation((returns) => Boolean)
  async removePost(@Args("id") id: number) {
    return this.postService.remove(id);
  }

  // @ResolveField((of) => [Comment])
  // async comments(@Parent() user: Category) {
  //   const { categoryId } = user;

  //   return await this.categoryService.findAllByAuthorId(categoryId);
  // }
}
