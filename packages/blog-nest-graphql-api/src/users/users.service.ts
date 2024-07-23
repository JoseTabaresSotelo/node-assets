import { Inject, Injectable } from "@nestjs/common";
import { NEST_PGPROMISE_CONNECTION } from "nestjs-pgpromise";
import {
  allUsersQuery,
  createUserQuery,
  findUserByIdQuery,
  updateUserQuery,
} from "./users.queries";
import { NewUserInput } from "./users.input";
import { camelize } from "src/common/utils/format-cases";

@Injectable()
export class UsersService {
  constructor(@Inject(NEST_PGPROMISE_CONNECTION) private readonly pg: any) {}

  async update(id: number, user: NewUserInput) {
    const { userName, firstName, lastName, email, psw, userStatus } = user;
    const today = new Date();

    return await this.pg
      .query(updateUserQuery, [
        id,
        userName,
        firstName,
        lastName,
        email,
        psw,
        userStatus,
        today
      ])
      .then(([row]) => ({ ...camelize(row) }));
  }

  async create(user: NewUserInput) {
    const {userName, firstName, lastName, email, psw, userStatus } =
      user;
    const today = new Date();

    return await this.pg
      .query(createUserQuery, [
        userName,
        firstName,
        lastName,
        email,
        psw,
        userStatus,
        today
      ])
      .then(([row]) => ({ ...camelize(row) }));
  }

  async remove(id: number) {
    return id;
  }

  async findAll() {
    return await this.pg
      .query(allUsersQuery)
      .then((rows) => rows.map((row) => ({ ...camelize(row) })));
  }

  async findOneById(id: number) {
    return await this.pg.query(findUserByIdQuery, [id]).then(([row]) => ({
      ...camelize(row),
    }));
  }
}
