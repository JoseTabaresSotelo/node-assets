// Comments Queries

export const allCommentsQuery = 'SELECT * FROM public.comments ORDER BY comment_id ASC LIMIT 100';
export const findCommentByIdQuery = `SELECT * FROM public.comments WHERE comment_id=$1`;
