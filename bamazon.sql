DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
	item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price INTEGER(11),
    quantity INTEGER(11),
    primary key (item_id)
);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('Wireless Mouse', 'Electronics', 14.99, 35);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('Game of Thrones', 'Books', 7.99, 100);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('Basketball', 'Sports', 19.99 , 200);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('The Sound of Music', 'DVDs/Movies', 8.99, 75);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('Power Drill', 'Tools', 99.99, 15);

INSERT INTO products(product_name, department_name, price, quantity)
VALUES ('8" Round Baking Pan', 'Kitchen', 13.99, 15);

SELECT * FROM products