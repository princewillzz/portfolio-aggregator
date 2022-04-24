import { Button, Form, Input, message } from "antd";
import React from "react";
import { useAuth } from "../../contexts/auth/useAuth";

export const RegisterForm = () => {
	let auth = useAuth();

	const onFinish = async (values) => {
		try {
			await auth.registerUser(values, () => {
				setTimeout(() => {
					window.location.href = "/";
				}, 100);
			});
		} catch (error) {
			// message.error("Unable to register... Please try again!!");
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<Form
			name="basic"
			labelCol={{
				span: 8,
			}}
			wrapperCol={{
				span: 8,
			}}
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
		>
			<Form.Item label="Name" name="name">
				<Input />
			</Form.Item>
			<Form.Item label="Email" name="email">
				<Input />
			</Form.Item>
			<Form.Item label="Phone Number" name="phone">
				<Input />
			</Form.Item>
			<Form.Item
				label="Username"
				name="username"
				rules={[
					{
						required: true,
						message: "Please input your username!",
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="Password"
				name="password"
				rules={[
					{
						required: true,
						message: "Please input your password!",
					},
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				wrapperCol={{
					offset: 8,
					span: 16,
				}}
			>
				<Button type="primary" htmlType="submit">
					Register
				</Button>
			</Form.Item>
		</Form>
	);
};
