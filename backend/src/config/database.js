//DB connection
const mongoose = require("mongoose");

// Runs everytime server starts

const mongoUrl = "mongodb://localhost:27017/test";
console.log(mongoUrl);
if (!mongoUrl) {
	console.error("No database url found");
	process.exit(9);
}

const initializeDB = () => {
	return new Promise((resolve, reject) => {
		mongoose
			.connect(mongoUrl, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(async () => {
				console.log("Connected to MongoDB");
				resolve(true);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

module.exports = { initializeDB };
