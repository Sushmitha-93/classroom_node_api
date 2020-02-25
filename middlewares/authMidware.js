const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  console.log("Auth middleware..");

  // 1. Get JWT token from request header
  // 2. If no JWT in header send 401 response
  // 3. Verify JWT with secret key send 400 response

  const token = req.header("x-jwt");

  if (!token) res.status(401).send("No Token in request header (x-jwt)");

  try {
    const tokenDecoded = jwt.verify(token, config.get("JWTSecretKey"));
    req.user = tokenDecoded;
    console.log(req.user);
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};
