import { message } from "antd";
import { useEffect, useState } from "react";
import { checkAuth, signinUser } from "../../api/auth";

import { registerUserAPI } from "../../services/ProfileAPI";

const fakeAuth = {
	isAuthenticated: false,
	signin(cb) {
		fakeAuth.isAuthenticated = true;
		setTimeout(cb, 100); // fake async
	},
	signout(cb) {
		fakeAuth.isAuthenticated = false;
		setTimeout(cb, 100);
	},
};

export const useProvideAuth = () => {
	const [user, setUser] = useState(null);
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!isUserLoggedIn) {
			let user = checkAuth();
			setUser(user);
			if (user) {
				setIsUserLoggedIn(true);
			}
		}

		const timeout = setTimeout(() => {
			setIsLoading(false);
		}, 0);

		return () => {
			clearTimeout(timeout);
		};
	}, [isUserLoggedIn]);

	const signin = (values, cb) => {
		return signinUser(values, () => {
			setIsUserLoggedIn(true);
			if (typeof cb == "function") cb();
		});
	};

	const signout = (cb) => {
		localStorage.removeItem("token");
		setIsUserLoggedIn(false);
		if (typeof cb == "function") cb();
	};

	const registerUser = async (values, cb) => {
		if (!values.username || !values.password) {
			message.warn("Please fill the required fields!!");
			return;
		}

		try {
			const res = await registerUserAPI(values);

			if (res.status === 201) {
				message.success("Successfully registered!!");
				const token = res.data.data.token;
				localStorage.setItem("token", token);
				if (typeof cb === "function") {
					cb();
				}
			} else {
				message.error(res.data.message);
			}
		} catch (error) {
			message.error("Unable to register. Please try again!!");
		}
	};

	return {
		user,
		isLoading,
		isUserLoggedIn,
		signin,
		signout,
		registerUser,
	};
};
