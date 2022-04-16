# social-me

## Summary

* [Project Stack](#project-stack)
  * [Docker](#docker)
  * [Docker Compose](#docker-compose)
  * [Node.js](#node)
  * [PostgreSQL](#postgresql)
* [Setup Environment](#setup-environment)
* [Start Container Services](#start-container-services)
* [API Handbook](#api-handbook)
  * [Authorization](#authorization)
  * [Users](#users)
  * [Posts](#posts)
  * [Commentaries](#commentaries)
  * [Reactions (Likes)](#reactions---likes)
  * [Reactions (Dislikes)](#reactions---dislikes)

## Project Stack

### Docker

Develop a project in a [Docker](https://docs.docker.com/engine) environment it is a good practice in order to simulate the real production state, as well makes possible to easily configure and custom as needed.

### [Docker Compose](https://docs.docker.com/compose)

Excellent tool to manage and run, without extensive configuration, multi container Docker applications. Start, stop, restart and remove easily containers makes the development flow more efficient with [docker-compoer](https://docs.docker.com/compose).

### Node

Version: `^16.14`

Incredible ecosystem and runtime of JavaScript engine, one of the more recognizable, and loved, programing languages, [Node.js](https://nodejs.org/en/) allowed to developers reach a great level of scalability without thousands of lines of code.

### ExpressJS

Version: `^4.17.3`

Maybe the more famous REST API library to Node.js, [expressjs](https://expressjs.com/) offers an easy platform to build simple or complex API applications, with external libs support to be added as needed.

### KnexJS

Version: `^1.0.7`

Good query builder as well offers migrations support, [Knex](http://knexjs.org/) you just need to specify the database and connection auth to start using, no need for lines of code with long queries.

### PostgreSQL

Version: `11`

One of the most complete databases at the moment, [PostgresSQL](https://www.postgresql.org/docs/11/release-11-15.html) offers a whole group of functions and data type that make the data modeling accurate and effective.

## Setup Environment

The project was built in a [Docker](https://docs.docker.com/engine) environment and [docker-compoer](https://docs.docker.com/compose), that said, you can use it to run the project as well.

1. Copy the `.env.example` file and rename it to `.env`

    ```bash
    cp .env.example .env
    ```

    > Customize the values as needed

2. Run the container in CLI mode

    ```bash
    docker-compose run --rm --service-ports social-me-api bash
    ```

3. Install the dependencies

    ```bash
    yarn
    ```

4. Exit from CLI

## Start Container Services

You can start the services and use it as need such as the following examples:

* Social Me CLI

    ```bash
    docker-compose run --rm --service-ports social-me-api bash
    ```

* Social Me API

    ```bash
    docker-compose up social-me-api bash
    ```

* Postgres CLI

    ```bash
    docker-compose run --rm pgsql-cli
    ```

* Mailhog

    > If the API service is started, this service is started with it, so you can access the E-Mail interface in [localhost:8025](http://localhost:8025)

    ```bash
    docker-compose up mailhog
    ```

## API Handbook

Use the [Postman](https://www.postman.com/product/what-is-postman/) collection in `doc/collections` folder to test the API's endpoints

* In order to use the API, you need to start up the services first
* Note that for some tests (e.g. edit a post with other user token that not the owner) you have to create more than one user.
* After the user creation, use the `/auth` endpoint to generate a token for each user that you will use in requests contexts, than set the token as Postman Collection Variable

### Authorization

* **POST**: `/auth`

  User has to submit his email address, and if it is valid, will return the signed token to use in API endpoints

  ```json
  {
      "email": "example@mail.com"
  }
  ```

### Users

* **GET** `/users` - (Protected)

  List all users registered into the database

* **POST** `/users`

  Create, with the given `name` and `email` values in JSON payload, the user into the database

  ```json
  {
      "name": "John Doe",
      "email": "example@mail.com"
  }
  ```

* **PUT** `/users/<userId>` - (Protected)

  Update the `name` and `email` related to the user `id` informed **ONLY IF** matches with the user `id` in the signed token informed

  ```json
  {
      "name": "John Doe Changed",
      "email": "example.changed@mail.com"
  }
  ```

* **DELETE** `/users/<userId>` - (Protected)

  Delete the user with the `id` informed **ONLY IF** matches with the user `id` in the signed token informed

### Posts

* **GET** `/posts` - (Protected)

  List all posts registered into the database

* **GET** `/posts/<postId>` - (Protected)

  Get all info related to the post with the given `id`, and for each display request increase the view count by one

* **GET** `/posts/history/<postId>` - (Protected)

  Get all info related to the updates the the post creator made in the post data (`title` and `description`) by the `id` informed

* **POST** `/posts/reports` - (Protected)

  Retrieve a report with all the posts into the database

* **POST** `/posts` - (Protected)

  Create a post with the `title` and `description` informed in the JSON payload, and link the created post with the user `id` in the sign token informed

  ```json
  {
      "title": "This is a title",
      "description": "This should be a long text"
  }
  ```

* **PUT** `/posts/<postId>` - (Protected)

  Update the `title` and `description` related to the post `id` informed **ONLY IF** the user `id` in the signed token is the same as the post owner

  ```json
  {
      "title": "This is a title Changed",
      "description": "This should be a long text Changed"
  }
  ```

* **DELETE** `/posts/<postId>` - (Protected)

  Delete the post with the `id` informed **ONLY IF** matches with the user that created it

### Commentaries

* **GET** `/commentaries/<postId` - (Protected)

  List all commentaries registered into the database related to the post `id` informed

* **POST** `/commentaries` - (Protected)

  Create a commentary with the `postId` and `description` informed in the JSON payload

  ```json
  {
      "postId": "This is a title",
      "description": "This should be a short text"
  }
  ```

* **PUT** `/commentaries/<commentId>` - (Protected)

  Update the `description` related to the commentary `id` informed **ONLY IF** the user `id` in the signed token is the same as the commentary owner

  ```json
  {
      "description": "This should be a short text Changed"
  }
  ```

* **DELETE** `/commentaries/<commentId>` - (Protected)

  Delete the commentary with the `id` informed **ONLY IF** matches with the user that created it or the user that created the post that hold the commentary

### Reactions - Likes

* **PATCH** `/posts/<postId>/like` - (Protected)

  Increase the post like value by one **ONLY IF** the user that requested did not reacted yet.

* **PATCH** `/posts/<postId>/like/undo` - (Protected)

  Decrease the post like value by one **ONLY IF** the user that requested already reacted to it.

### Reactions - Dislikes

* **PATCH** `/posts/<postId>/dislike` - (Protected)

  Increase the post dislike value by one **ONLY IF** the user that requested did not reacted yet.

* **PATCH** `/posts/<postId>/dislike/undo` - (Protected)

  Decrease the post dislike value by one **ONLY IF** the user that requested already reacted to it.
