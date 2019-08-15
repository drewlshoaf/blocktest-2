A REST API built with Node/Express, MongoDB, with support for JWT auth, to support a 'to do list' type of application.

# install

    npm install

# test

    npm test

# run

    npm start

# api

Protected routes require the use of the x-auth-token header and token value.

register a new user (public)

    POST /api/user/register/

    {
      "email" : "youremail@yourprovider.tld",
      "password" : "yourpassword"
    }

- **login(public) **

request

    POST /api/user/login/

input

    {
      "email" : "youremail@yourprovider.tld",
      "password" : "yourpassword"
    }

output

    sampletoken...

- **create a new todo (protected) **

request

    POST /api/todo/

input

    {
      "title" : "sample title",
      "description" : "sample description",
      "dueDate" : "2019-01-01"
    }

- **list all todo's (protected) **

request

    GET /api/todo/

- **get a todo (protected) **

request

    GET /api/todo/[todoId]

- **update a todo (protected) **

request

    PUT /api/todo/[todoId]

input

    {
      "title" : "sample title",
      "description" : "sample description",
      "dueDate" : "2019-01-01"
    }

- **delete a todo (protected) **

request

    DELETE /api/todo/[todoId]
