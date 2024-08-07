SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET default_tablespace = '';
SET default_with_oids = false;


---
--- drop tables
---

DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS users;

---
--- drop enums
---

DROP TYPE IF EXISTS category_status;
DROP TYPE IF EXISTS comment_status;
DROP TYPE IF EXISTS user_status;

---
--- create enums
---

CREATE TYPE category_status AS ENUM ('public', 'private');
CREATE TYPE comment_status AS ENUM ('open', 'close', 'pending', 'reject');
CREATE TYPE user_status AS ENUM ('active', 'inactive');

---
--- create tables
---

CREATE TABLE IF NOT EXISTS "users"(
  user_id SERIAL,
  user_name character varying(20) NOT NULL,
  first_name character varying(30) NOT NULL,
  last_name character varying(50) NOT NULL,
  email character varying(120) NOT NULL,
  psw character varying(30) NOT NULL,
  user_status user_status DEFAULT 'active',
  created_at date NOT NULL,
  updated_at date NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS categories (
  category_id SERIAL,
  category_name character varying(30) NOT NULL,
  category_description character varying(120) NOT NULL,
  category_status category_status DEFAULT 'public',
  created_at date NOT NULL,
  updated_at date NOT NULL,
  PRIMARY KEY (category_id)
); 

CREATE TABLE IF NOT EXISTS comments(
  comment_id SERIAL,
  author int NOT NULL REFERENCES "users" (user_id),
  content character varying(120) NOT NULL,
  status comment_status DEFAULT 'pending',
  created_at date NOT NULL,
  updated_at date NOT NULL,
  PRIMARY KEY (comment_id)
);

CREATE TABLE IF NOT EXISTS posts(
  post_id SERIAL,
  post_title character varying(30) NOT NULL,
  post_description character varying(120) NOT NULL,
  image bytea DEFAULT NULL,
  category_fk_id int NOT NULL REFERENCES categories (category_id),
  comment_fk_id int NOT NULL REFERENCES comments (comment_id),
  user_fk_id int NOT NULL REFERENCES "users" (user_id),
  created_at date NOT NULL,
  updated_at date NOT NULL,
  PRIMARY KEY (post_id)
);

---
--- delete data tables
---

DELETE FROM "users";
DELETE FROM comments;
DELETE FROM categories;
DELETE FROM posts;

---
--- populate data tables
---

INSERT INTO "users" (user_id, user_name, first_name, last_name, email, psw, user_status, created_at, updated_at) VALUES
	(1, 'nug', 'Daniel', 'Gonzalez', 'userone@test.com', 'psw1', 'active', '2024-03-21 16:44:38', '2024-03-21 16:44:40'),
	(2, 'porter', 'Jose', 'Medina', 'usertwo@test.com', 'psw2', 'active', '2024-03-21 16:44:38', '2024-03-21 16:44:40'),
	(3, 'lux', 'Maria', 'Hummels', 'userone@test.com', 'psw1', 'active', '2024-03-21 16:44:38', '2024-03-21 16:44:40'),
	(4, 'master', 'Joana', 'Venedetti', 'usertwo@test.com', 'psw2', 'active', '2024-03-21 16:44:38', '2024-03-21 16:44:40'),
	(5, 'vendatta', 'Diego', 'Cruz', 'userfour@test.com', 'psw4', 'inactive', '2024-03-21 16:44:38', '2024-03-21 16:44:40');

INSERT INTO categories (category_id, category_name, category_description, category_status, created_at, updated_at) VALUES
	(1, 'Shooter games', 'shooter games (or simply shooters)', 'public', '2024-03-21 16:20:25', '2024-03-21 16:20:26'),
	(2, 'Fighting games', 'Fighting games center around close-ranged combat', 'public', '2024-03-21 16:20:25', '2024-03-21 16:20:26'),
	(3, 'Survival games', 'Survival games start the player off with minimal resources', 'public', '2024-03-21 16:20:25', '2024-03-21 16:20:26'),
	(4, 'MMORPG', 'Massively multiplayer online role-playing games', 'private', '2024-03-21 16:20:25', '2024-03-21 16:20:26'),
	(5, 'Rhythm games', 'Rhythm game or rhythm action is a genre of music-themed action', 'public', '2024-03-21 16:20:25', '2024-03-21 16:20:26');

INSERT INTO comments (comment_id, author, content, status, created_at, updated_at) VALUES
	(1, 2, 'It is the best', 'open', '2024-03-21 16:30:40', '2024-03-21 16:30:41'),
	(2, 4, 'I prefer board games', 'open', '2024-03-21 16:30:40', '2024-03-21 16:30:41'),
	(3, 2, 'it could be better', 'pending', '2024-03-21 16:30:40', '2024-03-21 16:30:41'),
	(4, 3, 'It is no that bad', 'reject', '2024-03-21 16:30:40', '2024-03-21 16:30:41'),
	(5, 2, 'It is fun', 'close', '2024-03-21 16:30:40', '2024-03-21 16:30:41');

INSERT INTO posts (post_id, post_title, post_description, image, category_fk_id, comment_fk_id, user_fk_id, created_at, updated_at) VALUES
	(1, 'First Post', 'First post description', NULL, 1, 3, 3, '2024-03-21 16:48:42', '2024-03-21 16:48:44'),
	(2, 'Second Post', 'Second post description', NULL, 2, 1, 4, '2024-03-21 16:48:42', '2024-03-21 16:48:44'),
	(3, 'Third Post', 'Third post description', NULL, 1, 2, 3, '2024-03-21 16:48:42', '2024-03-21 16:48:44'),
	(4, 'Fourth Post', 'Fourth post description', NULL, 3, 2, 1, '2024-03-21 16:48:42', '2024-03-21 16:48:44'),
	(5, 'Fifth Post', 'Fifth post description', NULL, 1, 1, 1, '2024-03-21 16:48:42', '2024-03-21 16:48:44');

---
--- query sample
---

DROP SEQUENCE IF EXISTS user_sequence;
DROP SEQUENCE IF EXISTS category_sequence;
DROP SEQUENCE IF EXISTS comment_sequence;
DROP SEQUENCE IF EXISTS post_sequence;

CREATE SEQUENCE user_sequence START 6;                               
CREATE SEQUENCE category_sequence START 6;                          
CREATE SEQUENCE comment_sequence START 6;             
CREATE SEQUENCE post_sequence START 6;             

ALTER TABLE users ALTER COLUMN user_id SET DEFAULT nextval('user_sequence'::regclass);
ALTER TABLE categories ALTER COLUMN category_id SET DEFAULT nextval('category_sequence'::regclass);
ALTER TABLE comments ALTER COLUMN comment_id SET DEFAULT nextval('comment_sequence'::regclass);
ALTER TABLE posts ALTER COLUMN post_id SET DEFAULT nextval('post_sequence'::regclass);

---
--- query sample
---

SELECT 
  post_id,
  post_title,
  post_description,
  image,
  category_name,
  category_status,
  content,
  status,
  CONCAT(u.first_name, ' ', u.last_name) as user_name,
  p.created_at,
  p.updated_at
FROM public.posts AS p
INNER JOIN public.categories AS cat ON cat.category_id = p.category_fk_id
INNER JOIN public.comments AS com ON com.comment_id = p.comment_fk_id 
INNER JOIN public.users AS u ON u.user_id = p.user_fk_id
LIMIT 100;
