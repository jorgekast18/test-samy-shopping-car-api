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
