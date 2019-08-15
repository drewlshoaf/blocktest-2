const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User, validateUser } = require("../modals/user.modal");
const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User is already registerd.");

  //Take only required fields from the user input
  user = new User(_.pick(req.body, ["email", "password"]));

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = jwt.sign({ _id: user._id }, "JwtSecreteKey");
  res.header("x-auth-token", token).send(_.pick(user, ["email"]));
});

router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email address or password");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    return res.status(400).send("Invalid Email address or password");
  }

  //Generate json web token. The second argument to this should store inside the env variable.
  const token = jwt.sign({ _id: user._id }, "JwtSecreteKey");
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().required(),
    password: Joi.string().required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
