const mongoose = require("mongoose");

let profileSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			maxlength: 32,
			trim: true,
		},
		email: {
			type: String,
			trim: true,
		},
		phonenumber: {
			type: String,
		},
		username: {
			type: String,
			trim: true,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		links: [
			{
				title: {
					type: String,
					required: true,
				},
				url: {
					type: String,
					required: true,
				},
				isHidden: {
					type: Boolean,
					default: false,
				},
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
