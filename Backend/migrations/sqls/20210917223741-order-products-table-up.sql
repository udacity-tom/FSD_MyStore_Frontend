CREATE TABLE order_products(
id SERIAL PRIMARY KEY, 
productId bigint REFERENCES products(id), 
quantity integer,
orderId bigint REFERENCES orders(id) ON DELETE CASCADE
);