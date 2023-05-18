var express = require('express');
var jwt = require('jsonwebtoken');


var router = express.Router();

// middleware to check for authorization
function checkAuth(req, res,) {
  const authHeader = decodeURIComponent(req.headers.authorization);
  if (!authHeader) {
    return res.status(401).json({ error: "Missing authorization header" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { email: decodedToken.email };
    res.status(200).json({_msg: "valid token"});
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

router.post("/", checkAuth)

module.exports = router;