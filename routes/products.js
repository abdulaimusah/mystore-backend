var express = require('express');
var dbo = require("../db/conn");
//const { ObjectId } = require('mongodb');


var router = express.Router();



// get all posts
router.get("/", async function (req, res) {


  dbConnect = dbo.getDb()

    dbConnect
     .collection("products")
     .find({}).limit(4)
     .toArray(function (err, result) {
       if (err) {
         res.status(400).send("Error fetching products!");
       }
       else {
         res.json(result);
       }
     });
});

module.exports = router ;

/** 
// find a post
router.get("post/:id", async function(req, res) {
  console.log(req.params.id)
    
    // retrieve requested post ID
    const requestId = req.params.id.trim();
    
    // get database connection and append collection findOne method
     dbo.getDb()
     .collection("posts")
     .findOne({
      _id: ObjectId(requestId)
     })
     .then(result => {
      console.log(typeof result);
      res.json(result);
     });
})

// create a post
router.post("/create", async function(req, res) {
    const dbConnect = dbo.getDb();
    const matchDocument = {
      post_id: req.body.id,
      last_modified: new Date(),
      session_id: req.body.session_id,
      post_title: req.body.title,
      post_content: req.body.content,
      post_likes: req.body.likes,
      post_comments: req.body.comments,
    };

    dbConnect
     .collection("posts")
     .insertOne(matchDocument, function (err, result) {
       if (err) {
         res.status(400).send("Error creating a post");
       }
       else {
         console.log("Added a post with id: ", result.insertedId);
         res.status(204).send();
       }
     });
});
//update a post
router.put("/update", function (req, res) {
    const dbConnect = dbo.getDb();
    const postId = { _id: req.body.id };

    const updates = {
      $set: {
        post_id: req.body.id,
        last_modified: new Date(),
        session_id: req.body.session_id,
        post_title: req.body.title,
        post_content: req.body.content,
        post_likes: req.body.likes,
        post_comments: req.body.comments,
      }
    }

    dbConnect
     .collection("posts")
     .updateOne(postId, updates, function (err, _result) {
         if (err) {
           res.status(400).send(" Error updating post with id: ",
           postId);
         } else {
           console.log("A post updated");
         }
     });
});
// delete a post
router.delete("/delete", function (req, res) {
  const dbConnect = dbo.getDb();
  const postId = { _id: req.body.id };

  dbConnect
    .collection("posts")
    .deleteOne(postId, function (err, _result) {
      if (err) {
        res.status(400).send(`Error deleting post with id: ${postId}`);
      }
      else {
        console.log("A post deleted");
      }
    });
});
module.exports = router;

**/