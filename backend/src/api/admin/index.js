const express = require("express");
const Profile = require("../../models/Profile");
const { getProfileByUserName } = require("../../services/profile-service");
const { isNull, isValidURL } = require("../../util/utility");
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

		const { title, url, content } = req.body;

		if (isNull(title) || isNull(url)) {
			return res.status(200).json({
				success: false,
				error: true,
				message: "Invalid Data!!",
			});
		}

		if (!isValidURL(url)) {
			return res.status(200).json({
				success: false,
				error: true,
				message: "Invalid URL!!",
			});
		}

		const link = { title, url, content };

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
			message: "Link Added Successfully!",
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

AdminAPI.delete("/link/:linkId", async (req, res) => {
	try {
		const { userid } = res.locals;
		const { linkId } = req.params;

		console.log("Deleting link with id: ", linkId);
		console.log(res.locals);

		await Profile.findByIdAndUpdate(
			userid,
			{
				$pull: { links: { _id: linkId } },
			},
			{ runValidators: true }
		);

		return res.status(200).json({
			success: true,
			message: "Link successfully Deleted!!",
		});
	} catch (error) {
		return res.status(500).json({ error: true, message: error.message });
	}
});

AdminAPI.put("/link", async (req, res) => {
	try {
		const { userid } = res.locals;
		const { _id, title, url, content } = req.body;

		const profile = await Profile.findById(userid);

		profile.links = profile.links?.map((_link) => {
			console.log(_link._id.toString() !== _id);
			console.log(_link);
			if (_link._id.toString() !== _id) {
				return _link;
			}

			console.log("Update ", _link);

			if (title) {
				_link.title = title;
			}
			if (url) {
				_link.url = url;
			}
			if (content) {
				_link.content = content;
			}
			return _link;
		});

		const updatedProfile = await profile.save();

		return res.status(200).json({
			success: true,
			message: "Link successfully Deleted!!",
			data: { profile: updatedProfile },
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: true, message: error.message });
	}
});

module.exports = AdminAPI;
