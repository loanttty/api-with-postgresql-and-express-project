CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id integer REFERENCES products(id),
    user_id integer REFERENCES users(id),
    quantity integer,
    status VARCHAR(20) NOT NULL CONSTRAINT invalid_status CHECK (status='complete' OR status='pending')
);

INSERT INTO orders (product_id,user_id,quantity,status) VALUES
(1,1,12,'complete'),
(1,2,2,'pending'),
(2,2,1,'complete'),
(3,1,1,'complete'),
(2,4,3,'pending'),
(4,3,2,'complete');

