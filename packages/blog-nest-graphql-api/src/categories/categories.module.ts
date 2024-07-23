import { Module } from "@nestjs/common";
import { CommentsService } from "src/comments/comments.service";
import { CategoryService } from "./categories.service";
import { CategoryResolver } from "./categories.resolver";

@Module({
  providers: [CategoryService, CategoryResolver, CommentsService],
})
export class UsersModule {}
