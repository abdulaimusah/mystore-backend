var express = require('express');
var dbo = require("../db/conn");
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


router.post("/", checkAuth, async function(req, res) {
    const dbConnect = dbo.getDb();

    const matchDocument = {
      
      modified: new Date(),
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      rating: req.body.rating,
      image: req.body.image,
    };

    dbConnect
     .collection("products")
     .insertOne(matchDocument, function (err, result) {
       if (err) {
         res.status(500).json({
          error: "Internal server error"
         });
       }
       else {
         console.log("Added a product with id: ", result.insertedId);
         res.status(200).json({
          _msg: "successful",
          data: matchDocument
         });
       }
     });
});
module.exports = router;