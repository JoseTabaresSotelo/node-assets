import { Inject, Injectable } from "@nestjs/common";
import { NEST_PGPROMISE_CONNECTION } from "nestjs-pgpromise";
import {
  allCommentsQuery,
  createCommentQuery,
  deleteCommentQuery,
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
    return await this.pg
      .query(deleteCommentQuery, [id])
      .then(([row]) => camelize(row));
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

  findAllByAuthorId(userId: number): Comment[] {
    this.pg
      .query(findCommentByIdQuery, [userId])
      .then((rows) => rows.map((row) => camelize(row)));
    const comments = [
      {
        commentId: "2",
        content: "I prefer board games",
        author: 2,
        createdAt: "2024-03-21T06:00:00.000Z",
        status: "open",
        updatedAt: "2024-03-21T06:00:00.000Z",
      }
    ] as any;

    return comments;
  }
}
