CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(60),
    last_name VARCHAR(60),
    password VARCHAR(60)
);

INSERT INTO users (first_name,last_name,password) VALUES
('Alex','Carrotts','pAssword'),
('Ollie','Prince','paSSword'),
('Juno','Song','Password'),
('Hera','Karmen','passWord');