CREATE TABLE orders(
id SERIAL PRIMARY KEY, 
userId bigint REFERENCES users(id) ON DELETE CASCADE, 
status VARCHAR(20) NOT NULL
);