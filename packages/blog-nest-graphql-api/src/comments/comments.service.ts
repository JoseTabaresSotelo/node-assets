import { Inject, Injectable } from "@nestjs/common";
import { NEST_PGPROMISE_CONNECTION } from "nestjs-pgpromise";
import {
  allCommentsQuery,
  createCommentQuery,
  findCommentByIdQuery,
  updateCommentQuery,
} from "./comment.queries";
import { NewCommentInput } from "./comment.input";
import { camelize } from "src/common/utils/format-cases";

@Injectable()
export class CommentsService {
  constructor(@Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: any) {}

  async update(id: number, comment: NewCommentInput) {
    const { author, content, status } = comment;
    const today = new Date();

    return await this.pg
      .query(updateCommentQuery, [id, author, content, status, today])
      .then(([row]) => camelize(row));
  }

  async create(comment: NewCommentInput) {
    const { commentId, author, content, status } = comment;
    const today = new Date();

    return await this.pg
      .query(createCommentQuery, [commentId, author, content, status, today])
      .then(([row]) => camelize(row));
  }

  async remove(id: number) {
    return id;
  }

  async findAll() {
    return await this.pg
      .query(allCommentsQuery)
      .then((rows) => rows.map((row) => camelize(row)));
  }

  async findOneById(id: number) {
    return await this.pg
      .query(findCommentByIdQuery, [id])
      .then(([row]) => camelize(row));
  }
}
