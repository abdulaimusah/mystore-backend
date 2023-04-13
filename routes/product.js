var express = require('express');
var dbo = require("../db/conn");
const { ObjectId } = require('mongodb');


var router = express.Router();



// find a post
router.get("/:id", async function(req, res) {
  console.log(req.params.id)
    
    // retrieve requested post ID
    const requestId = req.params.id.trim();

    const query = { _id: ObjectId(requestId) }
    
    // get database connection and call collection's findOne method
     dbo.getDb()
     .collection("products")
     .findOne(query)
     .then(result => res.json(result))
     .catch(err => console.error(err));

  });


router.post("/:id", async function(req, res) {
  
  const newPost = {
    title: req.body.title,
    body: req.body.body,
    date: new Date(),
     
  }
});


module.exports = router;