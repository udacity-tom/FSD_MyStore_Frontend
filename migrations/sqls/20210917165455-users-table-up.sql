CREATE TABLE users (
id serial PRIMARY KEY, 
username VARCHAR(64) NOT NULL, 
firstname VARCHAR(64) NOT NULL,
lastname VARCHAR(64) NOT NULL,
password TEXT,
housenum NUMERIC(20),
street1 TEXT,
street2 TEXT,
city TEXT,
postcode TEXT,
country TEXT
);