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

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
