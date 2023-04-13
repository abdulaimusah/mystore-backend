var express = require('express');
var dbo = require("../db/conn");


var router = express.Router();



router.post("/", async (req, res) => {

    const dbConnect = dbo.getDb();
    const { username, password } = req.body;

    const users = dbConnect.collection("users");

    // Find the user with the given username
    const user = await users.findOne({ username });

    // Check if user exists
    if (!user) {
      res.status(401).json({
        res: 'Invalid username or password',
      });
      return;
    }
    else {
        res.status(200).json({
            res: "user found",
        });
    }

    
    
});
module.exports = router;