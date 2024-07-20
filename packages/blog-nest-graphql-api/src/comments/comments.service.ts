import {Inject, Injectable} from "@nestjs/common";
import {NEST_PGPROMISE_CONNECTION} from "nestjs-pgpromise";
import {allCommentsQuery, createCommentQuery, findCommentByIdQuery, updateCommentQuery} from "./comment.queries";
import { NewCommentInput } from "./comment.input";

@Injectable()
export class CommentsService {
  constructor(@Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: any) {}

  async update(id: number, comment: NewCommentInput) {
    const {author, content, status} = comment;
    const today = new Date();
     
    return await this.pg
      .query(updateCommentQuery, [id, author, content, status, today])
      .then(([row]) => ({
        id: row.comment_id,
        author: row.comment_author,
        content: row.comment_content,
        status: row.comment_status,
        creationDate: row.created_at,
        ...row,
      }));
  }

  async create(comment: NewCommentInput) {
    const {id, author, content, status} = comment;
    const today = new Date();
     
    return await this.pg
      .query(createCommentQuery, [id, author, content, status, today])
      .then(([row]) => ({
        id: row.comment_id,
        author: row.comment_author,
        content: row.comment_content,
        status: row.comment_status,
        creationDate: row.created_at,
        ...row,
      }));
  }

  async remove(id: number) {
    return id;
  }

  async findAll() {
    return await this.pg
      .query(allCommentsQuery)
      .then((rows) =>
        rows.map((row) => ({
          id: row.comment_id,
          author: row.comment_author,
          content: row.comment_content,
          status: row.comment_status,
          creationDate: row.created_at,
          ...row,
        }))
      );
  }

  async findOneById(id: number) {
    return await this.pg
      .query(findCommentByIdQuery, [id])
      .then(([row]) => ({
        id: row.comment_id,
        author: row.comment_author,
        content: row.comment_content,
        status: row.comment_status,
        creationDate: row.created_at,
        ...row,
      }));
  }
}
