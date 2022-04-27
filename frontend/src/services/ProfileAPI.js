import { axiosInstance } from "../api/axios-config";

export const getCurrentAdminProfileInfo = async () => {
	const URL = "/admin";
	return await axiosInstance.get(URL);
};

export const addNewLinkAPI = async (payload) => {
	const URL = "/admin/link";
	return await axiosInstance.post(URL, payload);
};

export const deleteLinkAPI = async (linkId) => {
	const URL = "/admin/link/" + linkId;
	return await axiosInstance.delete(URL);
};

export const registerUserAPI = async (payload) => {
	const URL = "/auth/register";
	return await axiosInstance.post(URL, payload);
};

export const getPublicProfileInfo = async (username) => {
	const URL = `/${username}`;
	return await axiosInstance.get(URL);
};

export const updateLinkAPI = async (payload) => {
	const URL = "/admin/link";
	return await axiosInstance.put(URL, payload);
};
