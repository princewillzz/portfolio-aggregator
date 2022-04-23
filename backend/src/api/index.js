const express = require("express");
const res = require("express/lib/response");
const { isAuthenticated } = require("../services/auth");
const { getProfileByUserName } = require("../services/profile-service");
const AdminAPI = require("./admin");
const API = express.Router();

API.use("/admin", isAuthenticated, AdminAPI);
API.get("/:publicName", async (req, res) => {
	const { publicName: username } = req.params;

	const profile = await getProfileByUserName(username);
	console.log(profile);

	res.status(200).json({
		data: { profile },
		message: "Successfully found profile!!",
	});
});

module.exports = API;
