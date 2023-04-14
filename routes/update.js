var express = require('express');
var dbo = require("../db/conn");
const { ObjectId } = require('mongodb');

var router = express.Router();

router.put("/:id", async function(req, res) {
      
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
        res: "updated"
       }) )
       .catch(error => res.status(200).json({
        res: "failed"
       }))
});

module.exports = router;