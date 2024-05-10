--
-- PostgreSQL database dump
--

-- Database: blog

DROP DATABASE IF EXISTS blog;

CREATE DATABASE blog
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C.UTF-8'
    LC_CTYPE = 'C.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

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

DROP TABLE IF EXISTS category;
CREATE TABLE IF NOT EXISTS category (
  category_id SERIAL,
  category_name character varying(30) NOT NULL,
  category_description character varying(120) NOT NULL,
  category_status smallint DEFAULT NULL,
  created_at date NOT NULL,
  updated_at date NOT NULL,
  PRIMARY KEY (category_id)
); 
-- ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELETE FROM category;
INSERT INTO category (category_id, category_name, category_description, category_status, created_at, updated_at) VALUES
	(1, 'Shooter games', 'shooter games (or simply shooters)', 0, '2024-03-21 16:20:25', '2024-03-21 16:20:26'),
	(2, 'Fighting games', 'Fighting games center around close-ranged combat', 0, '2024-03-21 16:20:25', '2024-03-21 16:20:26'),
	(3, 'Survival games', 'Survival games start the player off with minimal resources', 0, '2024-03-21 16:20:25', '2024-03-21 16:20:26'),
	(4, 'MMORPG', 'Massively multiplayer online role-playing games', 0, '2024-03-21 16:20:25', '2024-03-21 16:20:26'),
	(5, 'Rhythm games', 'Rhythm game or rhythm action is a genre of music-themed action', 0, '2024-03-21 16:20:25', '2024-03-21 16:20:26');

-- Dumping structure for table mariadbScaffold.Comment
DROP TABLE IF EXISTS comment;
CREATE TABLE IF NOT EXISTS comment(
  comment_id SERIAL,
  comment_author character varying(30) NOT NULL,
  comment_content character varying(120) NOT NULL,
  comment_status smallint DEFAULT NULL,
  created_at date NOT NULL,
  updated_at date NOT NULL,
  PRIMARY KEY (comment_id)
);
-- ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mariadbScaffold.Comment: ~5 rows (approximately)
DELETE FROM comment;
INSERT INTO comment (comment_id, comment_author, comment_content, comment_status, created_at, updated_at) VALUES
	(1, 'NUTS_NUGS', 'It is the best', 1, '2024-03-21 16:30:40', '2024-03-21 16:30:41'),
	(2, 'Zatara', 'I prefer board games', 1, '2024-03-21 16:30:40', '2024-03-21 16:30:41'),
	(3, 'Sid', 'it could be better', 1, '2024-03-21 16:30:40', '2024-03-21 16:30:41'),
	(4, 'Key', 'It is no that bad', 1, '2024-03-21 16:30:40', '2024-03-21 16:30:41'),
	(5, 'white', 'It is fun', 1, '2024-03-21 16:30:40', '2024-03-21 16:30:41');

DROP TABLE IF EXISTS 'user';
CREATE TABLE IF NOT EXISTS 'user'(
  user_id SERIAL,
  first_name character varying(30) NOT NULL,
  last_name character varying(50) NOT NULL,
  email character varying(120) NOT NULL,
  psw character varying(30) NOT NULL,
  user_status smallint DEFAULT NULL,
  created_at date NOT NULL,
  updated_at date NOT NULL,
  PRIMARY KEY (user_id)
) 
--ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mariadbScaffold.User: ~5 rows (approximately)
DELETE FROM 'user';
INSERT INTO 'user' (user_id, first_name, last_name, email, psw, user_status, created_at, updated_at) VALUES
	(1, 'NUTS_NUGS', 'one', 'userone@test.com', 'psw1', 1, '2024-03-21 16:44:38', '2024-03-21 16:44:40'),
	(2, 'Zatara', 'two', 'usertwo@test.com', 'psw2', 1, '2024-03-21 16:44:38', '2024-03-21 16:44:40'),
	(3, 'NUTS_NUGS', 'one', 'userone@test.com', 'psw1', 1, '2024-03-21 16:44:38', '2024-03-21 16:44:40'),
	(4, 'Zatara', 'two', 'usertwo@test.com', 'psw2', 1, '2024-03-21 16:44:38', '2024-03-21 16:44:40'),
	(5, 'Key', 'four', 'userfour@test.com', 'psw4', 1, '2024-03-21 16:44:38', '2024-03-21 16:44:40');


-- Dumping structure for table mariadbScaffold.Post
DROP TABLE IF EXISTS post;
CREATE TABLE IF NOT EXISTS post(
  post_id SERIAL,
  post_title character varying(30) NOT NULL,
  post_description character varying(120) NOT NULL,
  image bytea DEFAULT NULL,
  category_fk_id int NOT NULL REFERENCES category (category_id),
  comment_fk_id int NOT NULL REFERENCES country (comment_id),
  user_fk_id int NOT NULL REFERENCES user (user_id),
  created_at date NOT NULL,
  updated_at date NOT NULL,
  PRIMARY KEY (post_id),
) 
--ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table mariadbScaffold.Post: ~5 rows (approximately)
DELETE FROM post;
INSERT INTO post (post_id, post_title, post_description, image, category_fk_id, comments_fk_id, user_fk_id, created_at, updated_at) VALUES
	(1, 'First Post', 'First post description', NULL, 1, 3, 3, '2024-03-21 16:48:42', '2024-03-21 16:48:44'),
	(2, 'Second Post', 'Second post description', NULL, 2, 1, 4, '2024-03-21 16:48:42', '2024-03-21 16:48:44'),
	(3, 'Third Post', 'Third post description', NULL, 1, 2, 3, '2024-03-21 16:48:42', '2024-03-21 16:48:44'),
	(4, 'Fourth Post', 'Fourth post description', NULL, 3, 2, 1, '2024-03-21 16:48:42', '2024-03-21 16:48:44'),
	(5, 'Fifth Post', 'Fifth post description', NULL, 1, 1, 1, '2024-03-21 16:48:42', '2024-03-21 16:48:44');

-- Dumping structure for table mariadbScaffold.User









