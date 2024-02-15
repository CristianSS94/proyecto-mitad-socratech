CREATE DATABASE restaurants;

USE restaurants;

CREATE TABLE restaurant(
restaurant_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
restaurant_name VARCHAR(50) NOT NULL,
style VARCHAR(25) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(100) NOT NULL,
restaurant_description VARCHAR(200) NOT NULL,
phone_number VARCHAR(20) NOT NULL,
restaurant_img VARCHAR(100) NOT NULL,
restaurant_isdeleted BOOLEAN NOT NULL DEFAULT  false
);

CREATE TABLE dish(
dish_id SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
restaurant_id SMALLINT UNSIGNED NOT NULL,
dish_name VARCHAR(100) NOT NULL,
dish_description VARCHAR(250) NOT NULL,
dish_img VARCHAR(100) NOT NULL,
dish_isdeleted BOOLEAN NOT NULL DEFAULT false,
FOREIGN KEY(restaurant_id)
REFERENCES restaurant(restaurant_id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT * FROM restaurant;

SELECT * FROM dish;
