import { message } from "antd";
import { useState } from "react";
import { getPublicProfileInfo } from "../services/ProfileAPI";

export const usePublicProfileInfo = (username) => {
	const [profile, setProfile] = useState(null);

	useState(() => {
		if (username) {
			getPublicProfileInfo(username)
				.then((res) => {
					if (res.status === 200 && res.data.success) {
						setProfile(res.data.data.profile);
					} else {
						// message.warn(res.data.message);
					}
				})
				.catch((e) => {
					// message.error("Profile not Found!!");
				});
		}
	}, [username]);

	return profile;
};
