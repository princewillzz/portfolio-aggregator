const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const { JWTSignnature } = require("../constants/constant");
const Profile = require("../models/Profile");
const { verifyPassword } = require("../services/auth");
const authAPI = express.Router();

authAPI.post("/login", async (req, res) => {
	const { username, password } = req.body;

	const profile = await Profile.findOne({ username });

	const isVerified = await verifyPassword(password, profile.password);

	if (!isVerified) {
		return res.status(401).json({ error: "Wrong Password!!" });
	}

	let token = jsonwebtoken.sign(
		{
			user: {
				_id: profile._id,
				username: profile.username,
				email: profile.email,
			},
		},
		JWTSignnature,
		{ expiresIn: 1000 * 60 * 60 * 24 }
	);

	res.send({
		data: {
			token: token,
			user: profile,
		},
		message: "Login Success!!",
	});
});

module.exports = authAPI;
