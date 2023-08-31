const { expressjwt: expressJwt } = require("express-jwt");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.JWT_SECRET;

function getTokenFromHeader(req) {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

const auth = {
  required: expressJwt({
    secret: secret,
    algorithms: ["HS256"],
    userProperty: "payload",
    getToken: getTokenFromHeader,
  }),
  optional: expressJwt({
    secret: secret,
    algorithms: ["HS256"],
    userProperty: "payload",
    getToken: getTokenFromHeader,
    credentialsRequired: false,
  }),
};

module.exports = auth;
