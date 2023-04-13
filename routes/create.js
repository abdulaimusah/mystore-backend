var express = require('express');
var dbo = require("../db/conn");


var router = express.Router();


router.post("/", async function(req, res) {
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
         res.status(400).send("Error creating a product");
       }
       else {
         console.log("Added a product with id: ", result.insertedId);
         res.status(204).send();
       }
     });
});
module.exports = router;