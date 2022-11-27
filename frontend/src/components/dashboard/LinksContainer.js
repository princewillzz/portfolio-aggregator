import { DeleteOutlined, EditOutlined, ScanOutlined } from "@ant-design/icons";
import { Button, Divider, Input, List, message, Space, Typography } from "antd";
import React, { useState } from "react";
import { useProfileInfo } from "../../hooks/useProfileInfo";
import LinksInputFormContainer from "./LinksInputFormContainer";

const { TextArea } = Input;

export const LinksContainer = () => {
	const [readMoreForItem, setReadMoreForItem] = useState({});

	const { profile, addNewLink, deleteLink, updateLink } = useProfileInfo();
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

	const [isUpdating, setIsUpdating] = useState(false);
	const toggleEditing = (link) => {
		if (isUpdating) {
			console.log("Updated link: ", editLink);
			handleUpdateLink(editLink);
		} else {
			setEditLink(link);
		}
		setIsUpdating(!isUpdating);
	};

	const handleUpdateLink = async (link) => {
		updateLink(link);
	};

	const [editLink, setEditLink] = useState(null);

	const _renderContentBodyReadOnly = (item) => {
		if (readMoreForItem[item._id]) {
			return (
				<span>
					{item.content}{" "}
					<Button
						onClick={() => {
							setReadMoreForItem({
								...readMoreForItem,
								[item._id]: false,
							});
						}}
					>
						Read less...
					</Button>
				</span>
			);
		}

		if (item.content.length > 300) {
			return (
				<span>
					{item.content.slice(0, 300)}{" "}
					<Button
						onClick={() => {
							setReadMoreForItem({
								...readMoreForItem,
								[item._id]: true,
							});
						}}
					>
						Read more...
					</Button>
				</span>
			);
		} else {
			return item.content;
		}
	};

	return (
		<>
			<div className="links-container">
				<LinksInputFormContainer handleAddNewLink={handleAddNewLink} />

				<Divider />
				<div className="links-list-container">
					<h1>Your Blogs</h1>

					<List
						itemLayout="vertical"
						size="large"
						dataSource={profile?.links}
						renderItem={(item) => (
							<List.Item
								key={item._id}
								actions={[
									<Space>
										{!isUpdating && (
											<ScanOutlined
												
											/>
										)}
										{!isUpdating && (
											<DeleteOutlined
												onClick={() =>
													handleDeleteLink(item._id)
												}
											/>
										)}
										
										{!isUpdating ? (
											<EditOutlined
												onClick={() =>
													toggleEditing(item)
												}
											/>

										)
										 : (
											<Button
												type="primary"
												onClick={toggleEditing}
											>
												Save
											</Button>
										)}
									</Space>,
								]}
							>
								<List.Item.Meta
									title={
										isUpdating ? (
											<Input
												placeholder="Title"
												defaultValue={item.title}
												onChange={(e) => {
													setEditLink({
														...editLink,
														title: e.target.value,
													});
												}}
											/>
										) : (
											<a href={item.url}>{item.title}</a>
										)
									}
								/>

								{isUpdating ? (
									<TextArea
										value={editLink.content}
										rows={12}
										onChange={(e) => {
											setEditLink({
												...editLink, 
												content: e.target.value
											})
										}}
									></TextArea>
								) : (
									<Typography>
										{_renderContentBodyReadOnly(item)}
									</Typography>
								)}

								{isUpdating ? (
									<Input
										placeholder="URL"
										defaultValue={item.url}
										onChange={(e) => {
											setEditLink({
												...editLink,
												url: e.target.value,
											});
										}}
									/>
								) : (
									<Typography>
										<a
											href={item.url}
											target="_blank"
											rel="noreferrer"
										>
											{item.url}
										</a>
									</Typography>
								)}
							</List.Item>
						)}
					/>
				</div>
			</div>
		</>
	);
};
