// Comments Queries

export const allCommentsQuery = 'SELECT * FROM public.comments ORDER BY comment_id ASC LIMIT 100;';
export const findCommentByIdQuery = `SELECT * FROM public.comments WHERE comment_id=$1;`;
export const createCommentQuery = `INSERT INTO 
  public.comments(comment_id, comment_author, comment_content, comment_status, created_at, updated_at) 
  VALUES ($1, $2, $3, $4, $5, $5) RETURNING *;`
export const updateCommentQuery = `UPDATE public.comments SET 
    (comment_author, comment_content, comment_status, updated_at) =
    ($2, $3, $4, $5) WHERE comment_id = $1 RETURNING *;`  