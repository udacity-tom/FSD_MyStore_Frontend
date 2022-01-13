INSERT INTO orders(id, status, userId) VALUES(1, 'complete', '1');
INSERT INTO orders(id, status, userId) VALUES(2, 'complete', '1');
INSERT INTO orders(id, status, userId) VALUES(3, 'active', '1');
INSERT INTO orders(id, status, userId) VALUES(4, 'complete','2');
INSERT INTO orders(id, status, userId) VALUES(5, 'active', '2');
INSERT INTO orders(id, status, userId) VALUES(6, 'active', '5');
INSERT INTO orders(id, status, userId) VALUES(7, 'complete', '5');
INSERT INTO orders(id, status, userId) VALUES(8, 'complete', '5');
ALTER SEQUENCE orders_id_seq RESTART WITH 9;