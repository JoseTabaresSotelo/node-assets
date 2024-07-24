import { ParseIntPipe } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { NewPostInput } from "./posts.input";
import { PostService } from "./posts.service";
import { Post } from "./posts.model";
import { User } from "src/users/users.model";
import { Comment } from 'src/comments/comments.model';
import { UsersService } from "src/users/users.service";
import { CommentsService } from "src/comments/comments.service";
import { CategoryService } from "src/categories/categories.service";

@Resolver((of) => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly usersService: UsersService,
    private readonly commentsService: CommentsService,
    private readonly categoryService: CategoryService

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

  @ResolveField((of) => [Comment])
  async comments(@Parent() post: Post) {
    const { commentFkId } = post;
    
    return await this.commentsService.findCommentByIds(commentFkId);
  }

  @ResolveField((of) => User)
  async category(@Parent() post: Post) {
    const { categoryFkId } = post;
    
    return await this.categoryService.findOneById(categoryFkId);
  }

  @ResolveField((of) => User)
  async user(@Parent() post: Post) {
    const { userFkId } = post;
    
    return await this.usersService.findOneById(userFkId);
  }
}
