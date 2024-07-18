const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = function(req , res , next) {
  try {
    // console.log(req.headers.authorization , "started");
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    // console.log(process.env.secret_key_jwt);
    const verifiedtoken = jwt.verify(token, process.env.secret_key_jwt);
    req.body.userId = verifiedtoken.userId;
    console.log("token got used here");
    // console.log("token got used here");
    next();
  } catch (error) {
    console.error(error);
    // console.error(error);
    res.status(401).send({ success: false, message: "You are not authorized to access this route!" });
  }
}