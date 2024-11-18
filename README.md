# Z1 Ecommerce

<p align="start">
  The main reason of this project, is create an api that can lead with basic interations of an ecommerce, like create a user and buy products. This api is far of be complete, but it toke to me to much effort to make it usable in 5 days.
</p>

## What would I do if I had more time?

Since this project was a week project, I had to combine with my actual job. So I choose to bring value to the project beside other things.
But if I had more time, I would do the following things:

- Add more tests and get the coverage to at least 70%.
- Add more validations in the endpoints.
- Improve the error handling.
- Add more features to the api like, control the stock of the products at the time of cart add.
- Add a service to send emails to the user.
- Add a service to send notification to the user.
- Add a Redis like to cache and block the products that are in the cart for some time.
- Improve the code quality since we have some routes that isn't necessary.
- Improve the documation with swagger.

_"Sometimes I'll start a sentence and I don't even know where it's going. I just home I find it along the way". Michael Scott_

## Makefile

### Why Makefile?

<p align="start">
  The Makefile is a tool that can help to run the project in a easy way. 
  The Makefile is a file that contains a set of directives used to build software. It can be used to compile the project, run tests, and deploy the project.
  In this project I used the Makefile to make it easier to run some commands and easier to understand some commands that you can do.
</p>
<a href="https://opensource.com/article/18/8/what-how-makefile" target="_blank">More about Makefile</a>

## Docker

_~Now it work in all machines 😎~_

### Compose

I created 3 services in the docker-compose file, to save your time, I added pgadmin, but if you have a db client of
your preference, you can remove the pgadmin service and make the build faster.

Obs: I added the migrate command to the Docker file, but it will not work since it not can run at build time.

## NestJS

### Why NestJS?

The reason that I choose NestJS, is because it is a framework that is easy to use, and have a lot of features that can
help to build a scalable application and it's type safe.

## Prisma

### Why Prisma?

I didn't have much time to make the queries, so choose an orm would be a life saver. I choose Prisma because it new, it's modern, it's type safe and is getting alot of
traction in the community.

## Swagger

The documentation of the api is in the swagger, you can access it in the endpoint /api-docs.

## How to run the project

Since we are using docker, you can run `docker-compose up` to run the project.

if you want to test the migrations you can set the `schema.prisma` service name to `localhost` from `db` and run the following command:

`npx prisma migrate dev --name=migrations`

obs: run this command after change the `schema.prisma` service name to `localhost`, and with docker running.

## Happy path

<p align="start">
  The happy path of this project is to create a user, login, create a product, add the product to the cart and buy the product. The user can see the products that he bought and the products that he has in the cart.
</p>

### Happy Path - Tutorial

<p align="start">
  So to start the happy path of this api, we need to create a user. To do that,
  we need to make a post request to the endpoint /users with the following body:

```json

POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "teste@teste.com",
  "password": "123456"
}

```

After create the user we need to signup the user and receive the jwt token.

```json

POST /auth
Content-Type: application/json

{
  "email": "teste@teste.com",
  "password": "123456"
}

```

Now we have the jwt token, we can create a product.
To do that, we need to make a post request to the endpoint /products with the following body:
_Obs: The jwt token is not necessary to create a product!_

```json

POST /products
Content-Type: application/json

{
  "name": "Product 1",
  "stock": 7
}

```

With the product created you can add the product to the cart making a post request to the endpoint /cart-items with
the following body:

```json
POST /cart-items
Content-Type: application/json
Authorization Bearer <jwt

{
  "productId": 1,
  "quantity": 1
}

```

Now we have the product in the cart, we can buy the product.
I designed the api to get the products in the cart, and create a order with these products.
The transaction that is doing this, is in the `src/order/order-service.ts`. Transaction guarantee that
the products in the cart will be removed after the order is created.

```json
POST /orders/purchase
Authorization Bearer <jwt

```

Now we have the product bought, we can see the products that we bought.

</p>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
