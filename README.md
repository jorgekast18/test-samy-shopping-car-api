# Samy Challenge - Create API for Shopping Cart

This project was created with NestJS and MongoDB as the database for data persistence. I made the decision to use this framework because it is a high performance JavaScript framework, powerful, flexible and easy to use to create mjy fast, secure and scalable API's.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Docker

This project has a docker-compose.yml where I have configured two services:

- Mongo: You will need to create an .env file in your root folder and add the environment variables as shown in the .env-example file, according to your MongoDB configuration.

- samy-shopping-car-api: Compile the Dockerfile where you configure a linux machine, copy the project and run it.
  Check out a few resources that may come in handy when working with NestJS:

### Run Docker

```bash
# run docker-compose file
$ docker-compose up -d
```

## Server

Once the server is running, you can make requests considering the following host:

`http://localhost:3000/api/v1`

## Endpoints Doc

- Swagger: It can be found at the url: `http://localhost:3000/api/v1/doc`.
- Bruno: Find the collections in the folder `./Samy Shopping Car Api`. In the root of the project.

## MongoDB - Documents

For this project, I decided to use MongoDB as the database for data persistence, because it is a NoSQL database and has better write performance which is important for a shopping cart that all the time is adding and removing products.

The documents are structured as follows.

### Product:

```JSON
"id": MongoId,
"name": String,
"description": String,
"location": String,
"price": Number,
"stock": Number,
"thumbnail": String,
"productType": ProductType
```

This collection contains the basic data of a product and additionally has a “ProductType” property that references another collection and I did it this way to preserve the integrity of the data. If it is required later on, to create another type of product like “consultancy”, it is just added in this new collection and used in the product collection.

### ProductType

```JSON
"id": MongoId,
"name": String
```

The ProductType collection only contains an “Id” and a “name” to identify the types of products that were created for the test: “Product”, “Event”. But it is scalable for when you want to add another product type such as a “Service” and ensures data integrity if you need to filter the products by their type.

### Cart

```JSON
"id": MongoId,
"items": Array,
"state": String,
"createdAt": Date
```

The “Cart” collection is intended to represent the shopping cart. The “items” property is a list of objects that contains all the products added with their unique properties for the cart such as: productID, price, quantity and total. I have decided to handle a different price when adding to the cart because discounts may occur when adding to the cart, but it will always be important to have the reference of the original price and therefore the productID refers to the product in the Product collection with its characteristics stored in the database. The “Cart” collection also has a state, this happens because I have decided that the cart can be created empty and then products can be added or modified and when the payment is done, the cart changes state to become an bill.

The cart states are as follows:

`Empty:` this is its default state and it means that the cart starts empty.

`Full:` The cart changes from full or full when one or more products are added.

`Finished:` The cart changes state to Finished when the purchase is completed, for this I have created an endpoint that closes the cart. When the cart changes to Finished state, the “stock” in the product collection is modified, since it should not be done before because no purchase has been completed and the stock should not change and also when the cart is closed, it becomes an invoice.

### Bill

```JSON
"products": Array,
"clientName": String,
"createdAt": Date
```

This is the simplest collection. It contains the “items” of the shopping cart, a “clientName” that at the moment is in the code (it is always the same) because there is no user management and a creation date.
