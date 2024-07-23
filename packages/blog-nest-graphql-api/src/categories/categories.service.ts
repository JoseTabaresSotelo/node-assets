import { Inject, Injectable } from "@nestjs/common";
import { NEST_PGPROMISE_CONNECTION } from "nestjs-pgpromise";
import {
  allCategoriesQuery,
  createCategoryQuery,
  findCategoryByIdQuery,
  updateCategoryQuery,
} from "./categories.queries";
import { camelize } from "src/common/utils/format-cases";
import { NewCategoryInput } from "./categories.input";

@Injectable()
export class CategoryService {
  constructor(@Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: any) {}

  async update(id: number, category: NewCategoryInput) {
    const { categoryName, categoryDescription, categoryStatus } = category;
    const today = new Date();

    return await this.pg
      .query(updateCategoryQuery, [
        id,
        categoryName, 
        categoryDescription, 
        categoryStatus,
        today
      ])
      .then(([row]) => ({ ...camelize(row) }));
  }

  async create(category: NewCategoryInput) {
    const { categoryName, categoryDescription, categoryStatus } =
      category;
    const today = new Date();

    return await this.pg
      .query(createCategoryQuery, [
        categoryName, 
        categoryDescription, 
        categoryStatus,
        today
      ])
      .then(([row]) => ({ ...camelize(row) }));
  }

  async remove(id: number) {
    return id;
  }

  async findAll() {
    return await this.pg
      .query(allCategoriesQuery)
      .then((rows) => rows.map((row) => ({ ...camelize(row) })));
  }

  async findOneById(id: number) {
    return await this.pg.query(findCategoryByIdQuery, [id]).then(([row]) => ({
      ...camelize(row),
    }));
  }
}
