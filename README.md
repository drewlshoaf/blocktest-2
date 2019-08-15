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

login (public)

    POST /api/user/login/

    {
      "email" : "youremail@yourprovider.tld",
      "password" : "yourpassword"
    }

create a new todo (protected)

    POST /api/todo/

    {
      "title" : "sample title",
      "description" : "sample description",
      "dueDate" : "2019-01-01"
    }

list all todo's (protected)

    GET /api/todo/

get a todo (protected)

    GET /api/todo/[todoId]

update a todo (protected)

    PUT /api/todo/[todoId]

    {
      "title" : "sample title",
      "description" : "sample description",
      "dueDate" : "2019-01-01"
    }

delete a todo (protected)

    DELETE /api/todo/[todoId]
