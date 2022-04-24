import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterForm";
import { useAuth } from "../contexts/auth/useAuth";

export const Login = () => {
	const [isLoginPage, setIsLogginPage] = useState(true);

	const toggleLoginPage = () => {
		setIsLogginPage(!isLoginPage);
	};

	return (
		<div className="login-wrapper">
			<h1>{isLoginPage ? "Login" : "Register"}</h1>
			{isLoginPage ? <LoginForm /> : <RegisterForm />}

			<div className="login-toggle-btn">
				<Button type="link" onClick={toggleLoginPage}>
					{!isLoginPage ? "Login" : "Register"}
				</Button>
			</div>
		</div>
	);
};
