CREATE TABLE products(
id serial PRIMARY KEY, 
name VARCHAR(64) NOT NULL, 
price NUMERIC(8, 2) NOT NULL, 
url text NOT NULL,
snippet VARCHAR(64) NOT NULL,
description text NOT NULL,
accreditation VARCHAR(64) NOT NULL,
category VARCHAR(64)
);