const express = require("express");
const res = require("express/lib/response");
const API = require("./api");
const authAPI = require("./auth");
const main = express();

main.use("/auth", authAPI);

main.use("/", API);

module.exports = main;
