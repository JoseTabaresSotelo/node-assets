-- Database: blog
--
-- PostgreSQL database dump
--

-- DROP DATABASE IF EXISTS blog;

--
-- PostgreSQL database creation
--

-- CREATE DATABASE blog
--     WITH
--     OWNER = postgres
--     ENCODING = 'UTF8'
--     TABLESPACE = pg_default
--     CONNECTION LIMIT = -1
--     IS_TEMPLATE = False;


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
--- create tables
---

CREATE TABLE IF NOT EXISTS categories (
  category_id SERIAL,
  category_name character varying(30) NOT NULL,
  category_description character varying(120) NOT NULL,
  category_status smallint DEFAULT NULL,
  created_at date NOT NULL,
  updated_at date NOT NULL,
  PRIMARY KEY (category_id)
); 

CREATE TABLE IF NOT EXISTS comments(
  comment_id SERIAL,
  comment_author character varying(30) NOT NULL,
  comment_content character varying(120) NOT NULL,
  comment_status smallint DEFAULT NULL,
  created_at date NOT NULL,
  updated_at date NOT NULL,
  PRIMARY KEY (comment_id)
);

CREATE TABLE IF NOT EXISTS "users"(
  user_id SERIAL,
  first_name character varying(30) NOT NULL,
  last_name character varying(50) NOT NULL,
  email character varying(120) NOT NULL,
  psw character varying(30) NOT NULL,
  user_status smallint DEFAULT NULL,
  created_at date NOT NULL,
  updated_at date NOT NULL,
  PRIMARY KEY (user_id)
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

INSERT INTO comments (comment_id, comment_author, comment_content, comment_status, created_at, updated_at) VALUES
	(1, 'NUTS_NUGS', 'It is the best', 1, '2024-03-21 16:30:40', '2024-03-21 16:30:41'),
	(2, 'Zatara', 'I prefer board games', 1, '2024-03-21 16:30:40', '2024-03-21 16:30:41'),
	(3, 'Sid', 'it could be better', 1, '2024-03-21 16:30:40', '2024-03-21 16:30:41'),
	(4, 'Key', 'It is no that bad', 1, '2024-03-21 16:30:40', '2024-03-21 16:30:41'),
	(5, 'white', 'It is fun', 1, '2024-03-21 16:30:40', '2024-03-21 16:30:41');

INSERT INTO "users" (user_id, first_name, last_name, email, psw, user_status, created_at, updated_at) VALUES
	(1, 'NUTS_NUGS', 'one', 'userone@test.com', 'psw1', 1, '2024-03-21 16:44:38', '2024-03-21 16:44:40'),
	(2, 'Zatara', 'two', 'usertwo@test.com', 'psw2', 1, '2024-03-21 16:44:38', '2024-03-21 16:44:40'),
	(3, 'NUTS_NUGS', 'one', 'userone@test.com', 'psw1', 1, '2024-03-21 16:44:38', '2024-03-21 16:44:40'),
	(4, 'Zatara', 'two', 'usertwo@test.com', 'psw2', 1, '2024-03-21 16:44:38', '2024-03-21 16:44:40'),
	(5, 'Key', 'four', 'userfour@test.com', 'psw4', 1, '2024-03-21 16:44:38', '2024-03-21 16:44:40');

INSERT INTO categories (category_id, category_name, category_description, category_status, created_at, updated_at) VALUES
	(1, 'Shooter games', 'shooter games (or simply shooters)', 0, '2024-03-21 16:20:25', '2024-03-21 16:20:26'),
	(2, 'Fighting games', 'Fighting games center around close-ranged combat', 0, '2024-03-21 16:20:25', '2024-03-21 16:20:26'),
	(3, 'Survival games', 'Survival games start the player off with minimal resources', 0, '2024-03-21 16:20:25', '2024-03-21 16:20:26'),
	(4, 'MMORPG', 'Massively multiplayer online role-playing games', 0, '2024-03-21 16:20:25', '2024-03-21 16:20:26'),
	(5, 'Rhythm games', 'Rhythm game or rhythm action is a genre of music-themed action', 0, '2024-03-21 16:20:25', '2024-03-21 16:20:26');

INSERT INTO posts (post_id, post_title, post_description, image, category_fk_id, comment_fk_id, user_fk_id, created_at, updated_at) VALUES
	(1, 'First Post', 'First post description', NULL, 1, 3, 3, '2024-03-21 16:48:42', '2024-03-21 16:48:44'),
	(2, 'Second Post', 'Second post description', NULL, 2, 1, 4, '2024-03-21 16:48:42', '2024-03-21 16:48:44'),
	(3, 'Third Post', 'Third post description', NULL, 1, 2, 3, '2024-03-21 16:48:42', '2024-03-21 16:48:44'),
	(4, 'Fourth Post', 'Fourth post description', NULL, 3, 2, 1, '2024-03-21 16:48:42', '2024-03-21 16:48:44'),
	(5, 'Fifth Post', 'Fifth post description', NULL, 1, 1, 1, '2024-03-21 16:48:42', '2024-03-21 16:48:44');

---
--- query sample
---

SELECT 
  post_id,
  post_title,
  post_description,
  image,
  category_name,
  comment_content,
  CONCAT(u.first_name, ' ', u.last_name) as user_name,
  p.created_at,
  p.updated_at
FROM public.posts AS p
INNER JOIN public.categories AS cat ON cat.category_id = p.category_fk_id
INNER JOIN public.comments AS com ON com.comment_id = p.comment_fk_id 
INNER JOIN public.users AS u ON u.user_id = p.user_fk_id
LIMIT 100;
