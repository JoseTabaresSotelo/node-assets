import { Min } from 'class-validator';
import { CreateCatInput } from '../../graphql.schema';

export class CreateCommentDto extends CreateCatInput {
  @Min(1)
  age: number;
}
