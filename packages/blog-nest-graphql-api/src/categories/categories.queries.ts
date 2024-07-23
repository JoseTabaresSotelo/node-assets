// Categories Queries

export const allCategoriesQuery = 'SELECT * FROM public.categories ORDER BY category_id ASC LIMIT 100;';
export const findCategoryByIdQuery = `SELECT * FROM public.categories WHERE category_id=$1;`;
export const createCategoryQuery = `INSERT INTO 
  public.categories(category_id, category_name, category_description, category_status, created_at, updated_at) 
  VALUES (DEFAULT, $1, $2, $3, $4, $5, $5) RETURNING *;`
export const updateCategoryQuery = `UPDATE public.categories SET 
    (category_name, category_description, category_status, user_status, updated_at) =
    ($2, $3, $4, $5, $6, $7, $8) WHERE category_id = $1  RETURNING *;`  
