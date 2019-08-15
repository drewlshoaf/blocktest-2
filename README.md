# closest

REST API built with Node/Express, MongoDB, with support for JWT auth, to support a 'to do list' type of application.

# dev notes

- The solution has been developed in node.js and tested on the node 11.2 version with a mix of ECMA versions depending on purpose.

# improvements

- The testing suite needs additional tests developed including tests which use local data.
- We should be storing new zip code -> geocode records after initial retrieval for faster future searches.

# install

clone repo, then run:

    npm install

# test

run:

    npm test

# run

run:

    npm start

# usage

All requests to protected routes require the use of the x-auth-token header and token value.

- **register a new user (public) **

request

    POST /api/user/register/

input

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
