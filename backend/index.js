const express = require("express");
const cors = require("cors");

const app = express();

// External dependency
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
// app.use(cookieParser());
app.use(cors());

const port = 8000;

const src = require("./src/index");

app.use("/", src);

const { initializeDB } = require("./src/config/database");

app.listen(port, async () => {
	console.log(`Example app listening on port ${port}`);

	try {
		await initializeDB();
	} catch (error) {
		console.log("Database not initialized!!", error);
	}
});
