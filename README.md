# social-me

## API Handbook

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
