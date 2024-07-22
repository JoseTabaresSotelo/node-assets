import { Module } from '@nestjs/common';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [],
  providers: [CommentsService, CommentsResolver],
})
export class CommentsModule {}
