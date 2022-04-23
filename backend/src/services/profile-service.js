const Profile = require("../models/Profile");

const getProfileByUserName = async (username) => {
	return await Profile.findOne({ username });
};

module.exports = {
	getProfileByUserName,
};
