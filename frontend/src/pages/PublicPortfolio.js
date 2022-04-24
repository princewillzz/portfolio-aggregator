import { Alert, Card, Col, Row, Typography } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { usePublicProfileInfo } from "../hooks/usePublicProfileInfo";

export const PublicPortfolio = () => {
	const [isLoading, setIsLoading] = useState(true);
	let { username } = useParams();

	const profileInfo = usePublicProfileInfo(username);

	useState(() => {
		const timeout = setTimeout(() => {
			setIsLoading(false);
		}, 1000);

		return () => clearTimeout(timeout);
	}, []);

	const _renderCards = () => {
		return profileInfo?.links?.map((_link) => (
			<Card
				title={_link.title}
				bordered={false}
				loading={isLoading}
				style={{ width: "min(550px, 90vw)" }}
			>
				<Typography>
					<a href={_link.url} target="_blank" rel="noreferrer">
						{_link.url}
					</a>
				</Typography>
			</Card>
		));
	};

	return (
		<>
			<div className="public-profile-page">
				<div className="info-container">
					{profileInfo ? (
						<Alert
							message={`Verified Profile ${
								profileInfo?.name || ""
							}`}
							description={
								<div>
									<div>
										Contact number:{" "}
										{profileInfo?.phonenumber || "NA"}
									</div>
									<div>
										Email: {profileInfo?.email || "NA"}
									</div>
								</div>
							}
							type="success"
							showIcon
						/>
					) : (
						<Alert
							message="Error"
							description="No User Profile Found."
							type="error"
							showIcon
						/>
					)}
				</div>
				<div className="site-card-wrapper">{_renderCards()}</div>
			</div>
		</>
	);
};
