var express = require("express");
var dbo = require("../db/conn");
var yup = require("yup");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

require("dotenv").config();

var router = express.Router();

router.post("/", async (req, res) => {
	try {
		// Define the validation schema for the request body
		const schema = yup.object().shape({
			email: yup.string().email().required("Email is required"),
			password: yup
				.string()
				.min(8)
				.matches(
					/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/,
					"Invalid password",
				)
				.required("Password is required"),
		});

		// Validate the request body against the schema
		await schema.validate(req.body);

		// get databsae connection and connect
		const dbConnect = dbo.getDb();

		const users = dbConnect.collection("users");

		// Find the user with the given username
		const user = await users.findOne({ email });

		// Check if user exists
		if (!user) {
			res.status(404).json({
				error: "User not found",
			});
		}

		// Check if password is correct
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid password" });
		}

		// generate a token
		const token = jwt.sign(
			{
				email: email,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "24h" },
		);

		// Authentication successful
		res.status(200).json({
			_msg: "Login successful",
			data: token,
		});
	} catch (error) {
		
		res.status(400).json({
			error: error.message
		});
	}
});

module.exports = router;
