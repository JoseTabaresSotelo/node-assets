import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  private readonly comments: Array<any & { ownerId?: number }> = [
    { id: 1, content: 'Lorem ipsum', ownerId: 1 },
  ];

  create(comment: any): any {
    comment.id = this.comments.length + 1;
    this.comments.push(comment);
    return comment;
  }

  findAll(): any[] {
    return this.comments;
  }

  findOneById(id: number): any {
    return this.comments.find(cat => cat.id === id);
  }
}
