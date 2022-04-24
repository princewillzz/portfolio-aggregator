import {
	DeleteOutlined,
	LikeOutlined,
	MessageOutlined,
	StarOutlined,
} from "@ant-design/icons";
import { Avatar, Divider, List, message, Space, Typography } from "antd";
import React from "react";
import { useProfileInfo } from "../../hooks/useProfileInfo";
import LinksInputFormContainer from "./LinksInputFormContainer";

export const LinksContainer = () => {
	const listData = [];
	for (let i = 0; i < 3; i++) {
		listData.push({
			url: "https://ant.design",
			title: `ant design part ${i}`,
		});
	}

	const { profile, addNewLink, deleteLink } = useProfileInfo();
	const handleAddNewLink = async (values) => {
		if (!values.title || !values.url) {
			message.error("Invalid Data!!");
			return;
		}

		try {
			await addNewLink(values);
		} catch (error) {}
	};

	const handleDeleteLink = (linkId) => {
		deleteLink(linkId);
	};

	return (
		<>
			<div className="links-container">
				<LinksInputFormContainer handleAddNewLink={handleAddNewLink} />

				<Divider />
				<div className="links-list-container">
					<h1>Your Links</h1>

					<List
						itemLayout="vertical"
						size="large"
						dataSource={profile?.links}
						renderItem={(item) => (
							<List.Item
								key={item.title}
								actions={[
									<Space>
										<DeleteOutlined
											onClick={() =>
												handleDeleteLink(item._id)
											}
										/>
									</Space>,
								]}
							>
								<List.Item.Meta
									title={<a href={item.url}>{item.title}</a>}
								/>

								<Typography>
									<a
										href={item.url}
										target="_blank"
										rel="noreferrer"
									>
										{item.url}
									</a>
								</Typography>
							</List.Item>
						)}
					/>
				</div>
			</div>
		</>
	);
};
