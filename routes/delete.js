var express = require('express');
var dbo = require("../db/conn");
const { ObjectId } = require('mongodb');

var router = express.Router();

router.delete("/:id", async function(req, res) {
      
      // retrieve requested post ID
      const requestId = req.params.id.trim();
  
      const query = { _id: ObjectId(requestId) };

      
      // get database connection and call collection's findOne method
       dbo.getDb()
       .collection("products")
       .deleteOne(query)
       .then(reply => res.status(200).json({
        res: "deleted"
       }) )
       .catch(error => res.status(200).json({
        res: "failed"
       }))
});

module.exports = router;