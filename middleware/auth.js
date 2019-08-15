const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denined");

  try {
    const decoded = jwt.verify(token, "JwtSecreteKey");
    req.user = decoded;
    req.body.userId = req.user._id;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};
