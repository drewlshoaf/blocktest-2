const mongoose = require("mongoose");
const Joi = require("joi");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  })
);

function validateUser(user) {
  const schema = {
    email: Joi.string().required(),
    password: Joi.string().required()
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;
