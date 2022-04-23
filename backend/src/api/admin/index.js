const express = require("express");
const AdminAPI = express.Router();

AdminAPI.get("/", async (req, res) => {
	res.send("Hello DAmin!!");
});

module.exports = AdminAPI;
