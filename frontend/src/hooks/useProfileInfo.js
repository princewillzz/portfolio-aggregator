import { message } from "antd";
import { useEffect, useState } from "react";
import {
	addNewLinkAPI,
	deleteLinkAPI,
	getCurrentAdminProfileInfo,
	updateLinkAPI,
} from "../services/ProfileAPI";

export const useProfileInfo = () => {
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		getCurrentAdminProfileInfo()
			.then((res) => {
				if (res.status === 200) {
					setProfile(res.data.data.profile);
				} else {
					message.error(
						"Something went wrong. Please try reloading!!"
					);
				}
			})
			.catch((e) => {
				message.error("Unable to Load your Data. Please reload!!");
			});
	}, []);

	const addNewLink = async (values) => {
		try {
			const res = await addNewLinkAPI(values);
			if (res.status === 201) {
				message.success("Added Link Successfully!!");
				const links = res.data.data.links;
				setProfile({ ...profile, links });
			} else {
				message.error(res.data.message);
			}
		} catch (error) {
			let msg = "Unable to Add Link!!";
			message.error(msg);
		}
	};

	const deleteLink = async (linkId) => {
		try {
			const res = await deleteLinkAPI(linkId);
			if (res.status === 200) {
				message.success("Successfully delete link!!");

				setProfile({
					...profile,
					links: profile.links?.filter(
						(_link) => _link._id !== linkId
					),
				});
			} else {
				message.error(res.data.message);
			}
		} catch (error) {
			message.error("Unable to Delete!!");
		}
	};

	const updateLink = async (payload) => {
		try {
			const res = await updateLinkAPI(payload);
			if (res.status === 200) {
				message.success("Successfully updated Link!!");
				const updatedProfile = res.data.data.profile;
				setProfile({ ...profile, links: updatedProfile.links });
			} else {
				message.warn(res.data.message);
			}
		} catch (error) {
			message.error("Something went wrong... Please try again!!");
		}
	};

	return {
		profile,
		addNewLink,
		deleteLink,
		updateLink,
	};
};
