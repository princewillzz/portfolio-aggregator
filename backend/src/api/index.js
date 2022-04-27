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

	try {
		const profile = await getProfileByUserName(username);
		if (!profile) {
			return res.status(200).json({
				success: false,
				error: true,
				message: "No User Profile found!!",
			});
		}
		profile.links = profile?.links.filter((_link) => !_link.isHidden);

		res.status(200).json({
			data: { profile },
			success: true,
			error: false,
			message: "Successfully found profile!!",
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			error: true,
			message: "Something went wrong. Please try again!!!",
		});
	}
});

module.exports = API;
