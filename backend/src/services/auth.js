const jsonwebtoken = require("jsonwebtoken");
const { JWTSignnature } = require("../constants/constant");

const verifyPassword = async (p1, p2) => {
	return p1 === p2;
};

const verifyToken = async (token) => {
	return jsonwebtoken.verify(token, JWTSignnature);
};

// Token verification
isAuthenticated = async (req, res, next) => {
	// Check for authorization header
	const { authorization } = req.headers;
	if (!authorization) {
		return res.status(401).send({ message: "Unauthorized" });
	}
	if (!authorization.startsWith("Bearer"))
		return res.status(401).send({ message: "Unauthorized" });
	const split = authorization.split("Bearer ");
	if (split.length !== 2)
		return res.status(401).send({ message: "Unauthorized" });
	// Get token from header and verify it
	const token = split[1];
	try {
		const roleCheckDecode = jsonwebtoken.decode(token);
		let decodedCustomToken = await verifyToken(token);
		res.locals = {
			...res.locals,
			userid: decodedCustomToken._id,
			email: decodedCustomToken.email,
			username: decodedCustomToken.username,
		};
		return next();
	} catch (error) {
		console.error(`${error.code} -  ${error.message}`);
		return res.status(401).send({ message: "Unauthorized" });
	}
};

const generateToken = (profile) => {
	return jsonwebtoken.sign(
		{
			user: {
				_id: profile._id,
				username: profile.username,
				email: profile.email,
			},
		},
		JWTSignnature,
		{ expiresIn: 1000 * 60 * 60 * 24 }
	);
};

module.exports = {
	verifyPassword,
	isAuthenticated,
	generateToken,
};
