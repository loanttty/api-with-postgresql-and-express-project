# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

The following endpoints are available:

| Endpoints                             | Usage                                          | Params                                                                     |
| ------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------- |
| `GET /products`                       | Get all of the products available for the app. |                                                                            |
| `GET /product/:id`                    | Get the details of a single product by its Id  |                                                                            |
| `POST /create`                        | Add a new product                              | **name** - [String] <br> **price** - [Number] <br> **category** - [String] |
| `GET /products-by-category/:category` | Get all products under a particular category   |                                                                            |
| `GET /top-five-products`              | Get the list of five most ordered products     |                                                                            |

#### Users

The following endpoints are available:

| Endpoints           | Usage                                          | Params                                                                               |
| ------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------ |
| `GET /users`        | Get all of the products available for the app. |                                                                                      |
| `GET /user/:id`     | Get the details of a single user by its Id     |                                                                                      |
| `POST /user/create` | Add a new user                                 | **first_name** - [String] <br> **last_name** - [String] <br> **password** - [String] |
| `GET /authenticate` | Authenticate an existing user                  | **first_name** - [String] <br> **password** - [String]                               |

#### Orders

The following endpoints are available:

| Endpoints                      | Usage                                           | Params |
| ------------------------------ | ----------------------------------------------- | ------ |
| `GET /order/user/:id`          | Get all orders by a particular user Id          |        |
| `GET /order/complete/user/:id` | Get all complete orders by a particular user Id |        |

## Data Shapes

#### Product

    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price integer CONSTRAINT positive_price CHECK (price > 0),
    category VARCHAR(60)

#### User

    id SERIAL PRIMARY KEY,
    first_name VARCHAR(60),
    last_name VARCHAR(60),
    password VARCHAR(60)

#### Orders

    id SERIAL PRIMARY KEY,
    product_id integer REFERENCES products(id),
    user_id integer REFERENCES users(id),
    quantity integer,
    status VARCHAR(20) NOT NULL CONSTRAINT invalid_status CHECK (status='complete' OR status='pending')
