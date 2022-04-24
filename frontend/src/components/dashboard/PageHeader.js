import { HomeOutlined, LogoutOutlined, MailOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { useAuth } from "../../contexts/auth/useAuth";
const { Header } = Layout;

export const PageHeader = () => {
	const { user, signout } = useAuth();
	return (
		<Header>
			<div className="logo">
				<span>Hi, {user?.username} </span>
			</div>
			<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
				<Menu.Item key="1" icon={<HomeOutlined />}>
					Dashboard
				</Menu.Item>
				<Menu.Item key="2" icon={<LogoutOutlined />} onClick={signout}>
					Logout
				</Menu.Item>
			</Menu>
		</Header>
	);
};
