import { Inject, Injectable } from "@nestjs/common";
import { NEST_PGPROMISE_CONNECTION } from "nestjs-pgpromise";
import {
  allPostsQuery,
  createPostQuery,
  findPostByIdQuery,
  updatePostQuery,
} from "./posts.queries";
import { camelize } from "src/common/utils/format-cases";
import { NewPostInput } from "./posts.input";

@Injectable()
export class PostService {
  constructor(@Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: any) {}

  async update(id: number, post: NewPostInput) {
    const { postTitle, postDescription, categoryFkId, commentFkId, userFkId } 
      = post;
    const today = new Date();

    return await this.pg
      .query(updatePostQuery, [
        id,
        postTitle, 
        postDescription, 
        categoryFkId,
        commentFkId,
        userFkId,
        today
      ])
      .then(([row]) => ({ ...camelize(row) }));
  }

  async create(post: NewPostInput) {
    const { postTitle, postDescription, categoryFkId, commentFkId, userFkId } =
      post;
    const today = new Date();

    return await this.pg
      .query(createPostQuery, [
        postTitle, 
        postDescription, 
        categoryFkId,
        commentFkId,
        userFkId,
        today
      ])
      .then(([row]) => ({ ...camelize(row) }));
  }

  async remove(id: number) {
    return id;
  }

  async findAll() {
    return await this.pg
      .query(allPostsQuery)
      .then((rows) => rows.map((row) => ({ ...camelize(row) })));
  }

  async findOneById(id: number) {
    return await this.pg.query(findPostByIdQuery, [id]).then(([row]) => ({
      ...camelize(row),
    }));
  }
}
