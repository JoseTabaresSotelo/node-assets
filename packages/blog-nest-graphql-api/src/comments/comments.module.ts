import { Module } from '@nestjs/common';
import { OwnersModule } from '../owners/owners.module';
import { CatOwnerResolver } from './cat-owner.resolver';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  imports: [OwnersModule],
  providers: [CommentsService, CommentsResolver, CatOwnerResolver],
})
export class CommentsModule {}
