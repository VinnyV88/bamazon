-- Create the database bamazon-db and specified it for use.
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Create the table departments.
CREATE TABLE departments (
  id int AUTO_INCREMENT,
  department_name varchar(30) NOT NULL,
  over_head_costs decimal(9,2) NOT NULL,
  PRIMARY KEY(id)
);

-- Create the table products.
CREATE TABLE products (
  id int AUTO_INCREMENT,
  product_name varchar(30) NOT NULL,
  department_id int,
  price decimal(9,2),
  stock_quantity int NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(department_id) references departments(id)
);

-- Create the table sales.
CREATE TABLE sales (
  id int AUTO_INCREMENT,
  product_id int,
  quantity_purchased int NOT NULL,
  created_at timestamp NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(product_id) references products(id)
);


-- Insert a set of records.
INSERT INTO departments (department_name, over_head_costs) VALUES ("Electronics & Computers", 5000000.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ("Clothing, Shoes & Jewelry", 1000000.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ("Home, Garden & Tools", 2000000.00);
INSERT INTO departments (department_name, over_head_costs) VALUES ("Sports & Outdoors", 450000.00);

INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Pioneer SP-FS52", 1, 129.00, 100);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Yamaha NS-SP1800BL", 1, 157.35, 222);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Onkyo TZ-3500SHD", 1, 375.75, 351);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Calvin Klein Jeans", 2, 79.99, 333);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Columbia Men’s Coat", 2, 235.75, 1267);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("UGG Women's Boots", 2, 175.99, 199);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("GE Microwave", 3, 250.00, 79);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("LG Refrigerator", 3, 1350.00, 164);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Entertainment Center", 3, 370.00, 439);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("TaylorMade Driver", 4, 306.00, 300);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("Cobra 3 Wood", 4, 279.25, 700);
INSERT INTO products (product_name, department_id, price, stock_quantity) VALUES ("CCM Hockey Goalie Pads", 4, 536.00, 888);
