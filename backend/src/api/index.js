const express = require("express");
const res = require("express/lib/response");
const { isAuthenticated } = require("../services/auth");
const AdminAPI = require("./admin");
const API = express.Router();

API.use("/admin", isAuthenticated, AdminAPI);
API.get("/", (req, res) => {
	res.send("Hello Public");
});

module.exports = API;
