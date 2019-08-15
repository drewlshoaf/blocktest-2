const mongoose = require("mongoose");
const Joi = require("joi");
const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    dueDate: {
      type: Date
    }
  })
);

function validateTodo(todo) {
  const schema = {
    userId: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    dueDate: Joi.date().required()
  };
  return Joi.validate(todo, schema);
}

exports.Todo = Todo;
exports.validateTodo = validateTodo;
