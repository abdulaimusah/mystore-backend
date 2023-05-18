var express = require('express');
var yup = require("yup");
var jwt = require("jsonwebtoken");
var dbo = require("../db/conn");
var bcrypt = require("bcryptjs");

require("dotenv").config();


var router = express.Router();



router.post("/", async (req, res) => {

    

    try {
      // Define the validation schema for the request body
      const schema = yup.object().shape({
        email: yup.string().email("Email should be valid email").required("Email is required"),
        password: yup
          .string()
          .min(8)
          .matches(
            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/,
            "Password must have at least one upper case letter and special character"
          )
          .required("Password is required"),
      });
  
      // Validate the request body against the schema
      await schema.validate(req.body);

      const dbConnect = dbo.getDb();
      const { email, password } = req.body;

      // Hash the password using bcrypt
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const usersCollection = dbConnect.collection("users");
    
      
      usersCollection.insertOne({ 
        email: email,
        password: hashedPassword,
       }, (err, result) => {
          if (err) {
            res.status(500).json({
                error: "internal server error"
            });
          } else {
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.JWT_SECRET,
              { expiresIn: "24h" } 
            ); 
            res.status(200).json({
                _msg: "User created",
                data: token
            });
          }
        });
    }
    catch (error) {
        res.status(400).json({
          error: error.message
        })
    }
});
module.exports = router;