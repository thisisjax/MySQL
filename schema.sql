-- drop database --
DROP DATABASE IF EXISTS bamazon_db;
-- create database --
CREATE database bamazon_db;

-- use database --
USE bamazon_db;

-- table --
CREATE TABLE products (
  item_id INT NOT NULL,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL (10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

-- Create new example rows
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (2217, "My T.H.U.G. Story", "Music", 23.99, 48);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4478, "JanSport", "Outdoors", 54.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1377, "Echo Dot", "Electronics", 39.99, 7);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8366, "Woolies Brush", "Detailing", 29.99, 23);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (8333, "Meguiars Wheel Shine", "Detailing", 27.99, 5);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5773, "The Affair", "Books", 12.99, 75);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5761, "A Killers Mind", "Books", 16.99, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (5492, "Unhinged", "Books", 14.99, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (1339, "Kindle E-reader", "Electronics", 79.99, 55);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (4495, "Coleman Sundome", "Outdoors", 85.99, 25);


-- select -- 
SELECT * FROM products;
