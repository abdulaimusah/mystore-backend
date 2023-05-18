var express = require('express');
var dbo = require("../db/conn");
const { ObjectId } = require('mongodb');
var jwt = require('jsonwebtoken');

var router = express.Router();

// middleware to check for authorization
function checkAuth(req, res, next) {
  const authHeader = decodeURIComponent(req.headers.authorization);
  if (!authHeader) {
    return res.status(401).json({ error: "Missing authorization header" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { email: decodedToken.email };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

router.put("/:id", checkAuth, async function(req, res) {
      
      // retrieve requested post ID
      const requestId = req.params.id.trim();
  
      const query = { _id: ObjectId(requestId) };

      const updatedDocument = {
      
        modified: new Date(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        rating: req.body.rating,
        image: req.body.image,
       };
      
      // get database connection and call collection's findOne method
       dbo.getDb()
       .collection("products")
       .replaceOne(
        query,
        updatedDocument
       )
       .then(reply => res.status(200).json({
        _msg: "successful",
        data: updatedDocument
       }) )
       .catch(error => res.status(500).json({
        error: "Internal server error"
       }))
});

module.exports = router;