var express = require('express');
var dbo = require("../db/conn");


var router = express.Router();




router.post('/', async (req, res) => {

  const dbConnect = dbo.getDb();
  const { username, password } = req.body;

  
  try {
    const users = dbConnect.collection('users');

    // Find the user with the given username
    const user = await users.findOne({ username });

    // Check if user exists
    if (!user) {
      res.status(401).json('Invalid username or password');
      return;
    }

    // Check if password is correct
    // const passwordMatch = await bcrypt.compare(password, user.password);
    
    if ( !(password === user.password) ) {
      res.status(401).json('Invalid username or password');
      return;
    }

    // Authentication successful
    res.status(200).json({
        res: 'Authentication successful',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
        res: 'Internal server error',
    });
  } 
});

module.exports = router;