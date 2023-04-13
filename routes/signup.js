var express = require('express');
var dbo = require("../db/conn");


var router = express.Router();



router.post("/", (req, res) => {
    const dbConnect = dbo.getDb();
    const { username, password } = req.body;

    const usersCollection = dbConnect.collection("users");

    
      
        usersCollection.insertOne({ username, password }, (err, result) => {
          if (err) {
            res.status(500).send("An error occurred while inserting user");
          } else {
            res.status(200).send("User created successfully");
          }
        });
    
});
module.exports = router;