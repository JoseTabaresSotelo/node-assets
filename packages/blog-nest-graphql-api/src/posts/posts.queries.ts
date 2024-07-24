// Posts Queries

export const allPostsQuery = 'SELECT * FROM public.posts ORDER BY post_id ASC LIMIT 100;';
export const findPostByIdQuery = `SELECT * FROM public.posts WHERE post_id=$1;`;
export const createPostQuery = `INSERT INTO 
  public.posts(post_id, post_title, post_description, category_fk_id, comment_fk_id, user_fk_id, created_at, updated_at) 
  VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $6) RETURNING *;`
export const updatePostQuery = `UPDATE public.posts SET 
    (post_title, post_description, category_fk_id, comment_fk_id, user_fk_id, updated_at) =
    ($2, $3, $4, $5, $6, $7) WHERE post_id = $1  RETURNING *;`  
