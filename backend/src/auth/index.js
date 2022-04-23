const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const { JWTSignnature } = require("../constants/constant");
const Profile = require("../models/Profile");
const { verifyPassword, generateToken } = require("../services/auth");
const { getProfileByUserName } = require("../services/profile-service");
const { handleMongooseValidationError } = require("../util/utility");
const authAPI = express.Router();

authAPI.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		const profile = await getProfileByUserName(username);
		if (!profile) {
			return res
				.status(400)
				.json({ success: false, message: "Bad Credentials!!" });
		}

		const isVerified = await verifyPassword(password, profile.password);

		if (!isVerified) {
			return res.status(401).json({ error: "Wrong Password!!" });
		}

		let token = generateToken(profile);

		res.send({
			data: {
				token: token,
				user: profile,
			},
			message: "Login Success!!",
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Invalid Request. Please try again!!",
		});
	}
});

authAPI.post("/register", async (req, res) => {
	const { username, password, email, phone } = req.body;

	try {
		const oldProfile = await getProfileByUserName(username);
		console.log(oldProfile);
		if (oldProfile) {
			throw new Error("Username Already Exists!!");
		}
		const profile = await Profile.create({
			username,
			email,
			phonenumber: phone,
			password,
		});

		let token = generateToken(profile);

		res.status(201).json({
			data: {
				token: token,
				user: profile,
			},
			message: "Registered Successfully!!",
		});
	} catch (error) {
		res.status(400).json({
			error: true,
			message: error.message,
		});
	}
});

module.exports = authAPI;
