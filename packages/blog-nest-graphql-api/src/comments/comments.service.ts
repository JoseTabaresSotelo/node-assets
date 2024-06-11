import {Inject, Injectable} from "@nestjs/common";
import {NEST_PGPROMISE_CONNECTION} from "nestjs-pgpromise";
import {allCommentsQuery, findCommentByIdQuery} from "./comment.queries";

@Injectable()
export class CommentsService {
  constructor(@Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: any) {}

  async create(comment: any) {
    return comment;
  }

  async findAll() {
    return await this.pg
      .query(allCommentsQuery)
      .then((rows) =>
        rows.map((row) => ({
          id: row.comment_id,
          content: row.comment_content,
          ...row,
        }))
      );
  }

  async findOneById(id: number) {
    return await this.pg
      .query(findCommentByIdQuery, [id])
      .then((rows) => rows[0]);
  }
}
