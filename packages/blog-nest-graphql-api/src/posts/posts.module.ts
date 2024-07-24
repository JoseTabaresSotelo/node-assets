import { Module } from "@nestjs/common";
import { PostService } from "./posts.service";
import { PostResolver } from "./posts.resolver";

@Module({
  providers: [PostService, PostResolver],
})
export class PostsModule {}
