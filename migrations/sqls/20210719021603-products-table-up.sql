CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price integer CONSTRAINT positive_price CHECK (price > 0),
    category VARCHAR(60)
);

INSERT INTO products (name,price,category) VALUES 
('Monitor',52,'Desktop'),
('Keyboard',23,'Desktop'),
('Classic Piano',198,'Musical-Instruments'),
('Speaker',99,'Speakers');