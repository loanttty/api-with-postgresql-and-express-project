# Storefront Backend Project

## Getting Started

###### Run `yarn install`

###### Add `.env` file to the root of the project

###### Create DB for test and development environment with credentials same as `database.json` file

###### Run `db-migrate up` to set-up database tables

###### Run `yarn start` to start the server. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

###### Or run `yarn watch` to start the server with tsc-watch

###### Or run `yarn test` to run through all endpoint and model test cases

## API Endpoints:

The following endpoints are available:

| Endpoints                             | Usage                                           | Params                                                                               |
| ------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------ |
| `GET /products`                       | Get all of the products available for the app.  |                                                                                      |
| `GET /product/:id`                    | Get the details of a single product by its Id   |                                                                                      |
| `POST /create`                        | Add a new product                               | **name** - [String] <br> **price** - [Number] <br> **category** - [String]           |
| `GET /products-by-category/:category` | Get all products under a particular category    |                                                                                      |
| `GET /top-five-products`              | Get the list of five most ordered products      |                                                                                      |
| `GET /users`                          | Get all of the products available for the app.  |                                                                                      |
| `GET /user/:id`                       | Get the details of a single user by its Id      |                                                                                      |
| `POST /user/create`                   | Add a new user                                  | **first_name** - [String] <br> **last_name** - [String] <br> **password** - [String] |
| `GET /authenticate`                   | Authenticate an existing user                   | **first_name** - [String] <br> **password** - [String]                               |
| `GET /order/user/:id`                 | Get all orders by a particular user Id          |                                                                                      |
| `GET /order/complete/user/:id`        | Get all complete orders by a particular user Id |                                                                                      |
| `POST /order/create`                  | Add a new order                                 | **status** - [String] <br> **user_id** - [Number]                                    |
| `POST /order/add-product`             | Add a new product to an existing order          | **quantity** - [Number] <br> **product_id** - [Number] <br> **order_id** - [Number]  |

## Note:

Please use this .env below:

`POSTGRES_HOST=localhost POSTGRES_DB=postgres POSTGRES_TEST_DB=store_front_test POSTGRES_DEV_USER=postgres POSTGRES_TEST_USER=test_user POSTGRES_PASSWORD=P@ssword123 ENV=dev BCRYPT_PASSWORD=do-not-give-up SALT_ROUNDS=9 TOKEN_SECRET=hello-whatsup`
