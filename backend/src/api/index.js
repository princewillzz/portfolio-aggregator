const express = require("express");
const res = require("express/lib/response");
const { isAuthenticated } = require("../services/auth");
const { getProfileByUserName } = require("../services/profile-service");
const { isNull } = require("../util/utility");
const AdminAPI = require("./admin");
const API = express.Router();

API.use("/admin", isAuthenticated, AdminAPI);
API.get("/:publicName", async (req, res) => {
	const { publicName: username } = req.params;

	const profile = await getProfileByUserName(username);
	profile.links =
		!isNull(profile.links) &&
		profile.links
			.map((_link) => (_link.isHidden ? _link : null))
			.filter((_link) => _link !== null);

	res.status(200).json({
		data: { profile },
		message: "Successfully found profile!!",
	});
});

module.exports = API;
