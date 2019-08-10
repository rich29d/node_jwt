const jwt = require("jwt-simple");
const moment = require("moment");

const users = require("../repositories/users");

module.exports = async function(req, res) {
  const email = req.body.email || "";
  const password = req.body.password || "";

  const user = await users.showByEmail(email);
  const isMatch = user && await users.comparePasswords(password, user.password);

  if (!isMatch) {
    return res.sendStatus(401);
  }

  const JWTKeySecret = process.env.JWT_KEY_SECRET;

  const expires =
    moment()
      .add(1, "days")
      .valueOf();
  
  const token =
    jwt.encode({
      iss: user.id,
      exp: expires
    },
    JWTKeySecret);

  return res.json({
    token,
    expires,
    user: user.toJSON()
  });
};
