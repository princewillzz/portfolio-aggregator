import { useEffect, useState } from "react";
import { checkAuth, signinUser } from "../../api/auth";
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
		} else {
			setUser(null);
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
		setIsUserLoggedIn(false);
		if (typeof cb == "function") cb();
	};

	return {
		user,
		isLoading,
		isUserLoggedIn,
		signin,
		signout,
	};
};
