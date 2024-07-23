import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  providers: [UsersService, UsersResolver, CommentsService],
})
export class UsersModule {}
