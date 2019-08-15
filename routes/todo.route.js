const auth = require("../middleware/auth");
const { validateTodo, Todo } = require("../modals/todo.modal");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

//For Creating a todo.
//Here Auth line is authenticating the user. set the auth tokens as x-auth-token
router.post("/", auth, async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let oneTodo = new Todo(
    _.pick(req.body, ["userId", "title", "description", "dueDate"])
  );

  await oneTodo.save();
  res.send(oneTodo);
});

// For get all todos
router.get("/", auth, async (req, res) => {
  Todo.find(function(error, result) {
    if (error) {
      res.send("Cannot get the data");
    } else {
      res.json(result);
    }
  });
});

// For get todo with id
router.get("/:id", auth, async (req, res) => {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
    if (err) {
      res.send("Cannot get the data");
    } else {
      res.json(todo);
    }
  });
});

//PUT for the update the request.
router.put("/:id", auth, async (req, res) => {
  //console.log(req.params.id);

  const todo = await Todo.findById(req.params.id);
  if (!todo) return;

  todo.set({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate
  });

  const result = await todo.save();
  res.send(result);
});

// For deleting the Todo
router.delete("/:id", auth, (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then(todo => {
      if (!todo) {
        return res
          .status(404)
          .send({ message: "Todo is not found with this id" + req.params.id });
      }
      res.send({ message: "Todo Deleted Succesfully" });
    })
    .catch(err => {
      return res.status(404).send({ message: "Todo is not found" });
    });
});

module.exports = router;
