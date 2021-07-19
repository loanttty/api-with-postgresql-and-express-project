CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    product_id REFERENCES products(id),
    quantity integer,
    user_id VARCHAR(10) REFERENCES users(id),
    status VARCHAR(20)
);