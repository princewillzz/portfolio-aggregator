import jwtDecode from "jwt-decode";
import { axiosInstance } from "./axios-config";

export const signinUser = (creds, cb) => {
	return axiosInstance.post("/auth/login", creds).then((res) => {
		const token = res.data.data.token;

		localStorage.setItem("token", token);

		cb();
	});
};

export const checkAuth = () => {
	try {
		const decoded = jwtDecode(localStorage.getItem("token"));
		console.log(decoded);
		if (decoded.exp > new Date().getTime() / 1000) {
			return {
				userId: decoded.user._id,
				username: decoded.user.username,
				email: decoded.user.email,
				phonenumber: decoded.user.phonenumber,
			};
		} else {
			localStorage.removeItem("token");
		}
	} catch (error) {}

	return false;
};
