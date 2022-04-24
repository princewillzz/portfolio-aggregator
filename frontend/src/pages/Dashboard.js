import { Layout } from "antd";
import React from "react";
import { LinksContainer } from "../components/dashboard/LinksContainer";
import { PageHeader } from "../components/dashboard/PageHeader";
const { Header, Footer, Sider, Content } = Layout;

export const Dashboard = () => {
	return (
		<Layout className="layout" style={{ minHeight: "100vh" }}>
			<PageHeader />

			<Content style={{ padding: "0 50px" }}>
				<div
					className="dashboard-layout-content"
					style={{ minHeight: "80vh" }}
				>
					<h1 style={{ textAlign: "center" }}>Dashboard</h1>
					<LinksContainer />
				</div>
			</Content>
			<Footer style={{ textAlign: "center", bottom: 0 }}>
				Created By Harsh Tiwari and Shristi Sagar
			</Footer>
		</Layout>
	);
};
