import axios from "axios";

const createProfile = async (username: string, email: string, password: string) => {
	return await axios.post(process.env.EXPO_PUBLIC_URL + "/profiles/register", {
		username: username,
		email: email,
		password: password,
	}, {headers: {"Content-Type": "application/json"}});
};

const loginProfile = async (userEmailOrName: string, userPassword: string) => {
	return await axios.post(process.env.EXPO_PUBLIC_URL + "/profiles/login", {
		username: userEmailOrName,
		email: userEmailOrName,
		password: userPassword,
	}, {headers: {"Content-Type": "application/json"}});
}

const getProfileByIdEmbedAll = async (id: number) => {
	return (await axios.get(process.env.EXPO_PUBLIC_URL + `/profiles/${id}?embed=all`)).data;
}
const getProfileById = async (id: number) => (await axios.get(process.env.EXPO_PUBLIC_URL + `/profiles/${id}`)).data.profile;

const getProfilesFollowing = async (id: number) => (await axios.get(process.env.EXPO_PUBLIC_URL + `/profiles/${id}/following`)).data;

const searchProfiles = async (search: string) => (await axios.get(process.env.EXPO_PUBLIC_URL + `/profiles/?search=${search}`)).data;

const followProfile = async (id: number, followingId: number) => (await axios.put(process.env.EXPO_PUBLIC_URL + `/profiles/follow`, {
	id: id,
	followingId: followingId,
})).data;

const unfollowProfile = async (id: number, followingId: number) => (await axios.put(process.env.EXPO_PUBLIC_URL + `/profiles/unfollow`, {
	id: id,
	followingId: followingId,
})).data;

const updateProfile = async (id: number, username: string, email: string, password: string) => {
	
	return await axios.put(process.env.EXPO_PUBLIC_URL + `/profiles/${id}`, {
		username: username,
		email: email,
		password: password,
	}, {headers: {"Content-Type": "application/json"}});
}

const getFollow = async (id: number) => (await axios.get(process.env.EXPO_PUBLIC_URL + `/profiles/${id}/follow`)).data;

export default {
	createProfile,
	loginProfile,
	getProfileByIdEmbedAll,
	searchProfiles,
	getProfilesFollowing,
	getProfileById,
	followProfile,
	unfollowProfile,
	updateProfile,
	getFollow
};
