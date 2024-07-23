import { ParseIntPipe } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Category } from "./categories.model";
import { NewCategoryInput } from "./categories.input";
import { CategoryService } from "./categories.service";

@Resolver((of) => Category)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @Query((returns) => [Category])
  async getCategories() {
    return this.categoryService.findAll();
  }

  @Query((returns) => Category)
  async findCategoryById(
    @Args("id", ParseIntPipe)
    id: number
  ): Promise<Category> {
    return this.categoryService.findOneById(id);
  }

  @Mutation((returns) => Category)
  async addCategory(
    @Args("newUserData") newUserData: NewCategoryInput
  ): Promise<Category> {
    return await this.categoryService.create(newUserData);
  }

  @Mutation((returns) => Category)
  async updateCategory(
    @Args("id", ParseIntPipe) id: number,
    @Args("updateCategoryData") newCategoryData: NewCategoryInput
  ): Promise<Category> {
    return await this.categoryService.update(id, newCategoryData);
  }

  @Mutation((returns) => Boolean)
  async removeCategory(@Args("id") id: number) {
    return this.categoryService.remove(id);
  }

  // @ResolveField((of) => [Comment])
  // async comments(@Parent() user: Category) {
  //   const { categoryId } = user;

  //   return await this.categoryService.findAllByAuthorId(categoryId);
  // }
}
