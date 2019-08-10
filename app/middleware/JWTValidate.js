const jwt = require("jwt-simple");
const HttpStatus = require("http-status-codes");
const moment = require("moment");

const users = require("../repositories/users");
const message = require("../util/responses");

module.exports = async function(req, res, next) {
  try {
    const auth = req.headers.authorization;
    const [, typeAuth, token] = auth.match(/^(JWT)+\s+(.*)/) || [];

    if (!token || typeAuth !== "JWT") {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: message.TOKEN_INVALID, typeAuth, token });
    }

    const JWTKeySecret = process.env.JWT_KEY_SECRET;
    const decoded = jwt.decode(token, JWTKeySecret);

    if (decoded.exp < moment().valueOf()) {
      res.json(HttpStatus.BAD_REQUEST, {
        message: message.TOKEN_INVALID,
        typeAuth, token
      });
    }

    const user = await users.show({
      _id: decoded.iss
    });

    if (!user) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: message.USER_NOT_FOUND });
    }

    req.user = user;

    return next();
  } catch (err) {
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json(message.TOKEN_INVALID);
  }
};
