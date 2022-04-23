const express = require("express");
const Profile = require("../../models/Profile");
const { getProfileByUserName } = require("../../services/profile-service");
const { isNull } = require("../../util/utility");
const AdminAPI = express.Router();

AdminAPI.get("/", async (req, res) => {
	try {
		const { username } = res.locals;
		const profile = await getProfileByUserName(username);

		return res.status(200).json({
			data: {
				profile: profile,
			},
		});
	} catch (error) {
		return res.status(500).json({ error: true, message: error.message });
	}
});

AdminAPI.post("/link", async (req, res) => {
	try {
		const { username } = res.locals;
		let profile = await getProfileByUserName(username);

		const { title, url } = req.body;

		if (isNull(title) || isNull(url)) {
			throw new Error("Incomplete Information!!");
		}

		const link = { title, url };

		if (isNull(profile.links)) {
			profile = await Profile.findOneAndUpdate(
				{ _id: profile._id },
				{ $set: { links: [link] } },
				{ new: true, runValidators: true }
			).exec();
		} else {
			profile = await Profile.findOneAndUpdate(
				{ _id: profile._id },
				{ $push: { links: link } },
				{ new: true, runValidators: true }
			).exec();
		}

		return res.status(201).json({
			data: {
				links: profile.links,
			},
		});
	} catch (error) {
		return res.status(500).json({ error: true, message: error.message });
	}
});

AdminAPI.put("/", async (req, res) => {
	try {
		const { username } = res.locals;
		let profile = await getProfileByUserName(username);

		const { email, phone } = req.body;

		await Profile.findByIdAndUpdate(profile._id, {
			email,
			phonenumber: phone,
		}).exec();

		return res.status(201).json({
			success: true,
			message: "Profile successfully updated!!",
		});
	} catch (error) {
		return res.status(500).json({ error: true, message: error.message });
	}
});

module.exports = AdminAPI;
