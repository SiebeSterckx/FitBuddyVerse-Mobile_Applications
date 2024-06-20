import profileService from "@/lib/profileService";
import { TProfile } from "@/types/profile.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SearchPage({ navigation }: { navigation: NavigationProp<any> }) {
	const [searchText, setSearchText] = useState('');
	const [users, setUsers] = useState<TProfile[]>([]);
	const [following, setFollowing] = useState<TProfile[]>([]);
	const [currentProfile, setCurrentProfile] = useState<TProfile>();

	const handleSearch = (text: string) => {
		setSearchText(text);
		if (text.length < 1) setUsers([]);
		else {
			profileService.searchProfiles(text).then(res => {
				setUsers(res.profiles);
			});
		}
	}

	const followHandler = (id: number) => {
		if(following.some((user) => user.id === id)) {
			profileService.unfollowProfile(currentProfile?.id ?? 0, id).then((res) => {
				setFollowing(res.profile.following);
			});
		}else {
			profileService.followProfile(currentProfile?.id ?? 0, id).then((res) => {
				setFollowing(res.profile.following);
			});
		}
	}

	useEffect(() => {

		AsyncStorage.getItem("profile").then((res) => {
			const profile = JSON.parse(res!);
			profileService.getProfilesFollowing(profile.id).then((res) => {
				setFollowing(res.profiles.following);
			});
			setCurrentProfile(profile);
		}).catch((err) => {
			console.log(err);
		});
		//Add search bar to navigation
		navigation.setOptions({
			headerTitle: () => (
				<TextInput className="h-12 text-lg" onChangeText={(text) => handleSearch(text)} placeholder="Search for user..." />
			)
		});
	}, []);

	return (
		<View className="bg-white flex-1 p-4">
			<FlatList
				data={users.filter(user => user.username.toLowerCase().includes(searchText.toLowerCase()))}
				keyExtractor={(item) => (item.id as number).toString()}
				ListHeaderComponent={() => (
					<Text className="text-base text-gray-400 text-center">{users.length == 0 ? 'No users found' : 'Search Results'}</Text>
				)}
				renderItem={({ item }) => (
					<View className="flex-row justify-between border-b-2 py-4 border-gray-300">
						<TouchableOpacity className="w-3/4" onPress={() => { navigation.navigate("ProfileUser", { id: item.id }) }}>
							<Text className="text-2xl font-bold">{item.username}</Text>
						</TouchableOpacity>
						{currentProfile?.id === item.id ? null : (
							<TouchableOpacity onPress={() => followHandler(item.id ?? 0)} className="bg-blue-400 rounded p-2">
								<Text className="text-center text-white font-bold">{following.map(profile => profile.id).includes(item.id) ? 'UNFOLLOW' : 'FOLLOW'}</Text>
							</TouchableOpacity>
						)}
					</View>
				)}
			/>
		</View>
	);
}
