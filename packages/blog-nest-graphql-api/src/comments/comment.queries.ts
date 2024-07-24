// Comments Queries

export const allCommentsQuery = 'SELECT * FROM public.comments ORDER BY comment_id ASC LIMIT 100;';
export const findCommentByIdQuery = `SELECT * FROM public.comments WHERE comment_id=$1;`;
export const createCommentQuery = `INSERT INTO 
  public.comments(comment_id, author, content, status, created_at, updated_at) 
  VALUES (DEFAULT, $1, $2, $3, $4, $4) RETURNING *;`;
export const updateCommentQuery = `UPDATE public.comments SET 
    (author, content, status, updated_at) =
    ($2, $3, $4, $5) WHERE comment_id = $1 RETURNING *;`;
export const deleteCommentQuery = `DELETE FROM public.comments WHERE comment_id=$1  RETURNING *;`;
export const findCommentByUserIdQuery = `SELECT * FROM public.comments WHERE author=$1;`;
export const findAllCommentsByAuthorIdQuery = `SELECT * FROM public.comments WHERE author=$1;`;
export const findAllCommentsByIdQuery = `SELECT * FROM public.comments WHERE commentId=$1;`;
