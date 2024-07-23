// Users Queries

export const allUsersQuery = 'SELECT * FROM public.users ORDER BY user_id ASC LIMIT 100;';
export const findUserByIdQuery = `SELECT * FROM public.users WHERE user_id=$1;`;
export const createUserQuery = `INSERT INTO 
  public.users(user_id, user_name, first_name, last_name, email, psw, user_status, created_at, updated_at) 
  VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $7) RETURNING *;`
export const updateUserQuery = `UPDATE public.users SET 
    (user_name, first_name, last_name, email, psw, user_status, updated_at) =
    ($2, $3, $4, $5, $6, $7, $8) WHERE user_id = $1 RETURNING *;`  
