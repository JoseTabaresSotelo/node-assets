import { Module } from '@nestjs/common';
import { OwnersModule } from '../owners/owners.module';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [OwnersModule],
  providers: [CommentsService, CommentsResolver],
})
export class CommentsModule {}
