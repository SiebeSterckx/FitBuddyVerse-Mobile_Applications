import Workout from "@/components/workout/Workout";
import profileService from "@/lib/profileService";
import { TProfileAll } from "@/types/profile.type";
import { EvilIcons } from "@expo/vector-icons";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

export default function ProfileUserPage({
	route,
	navigation,
}: {
	route: RouteProp<any>;
	navigation: NavigationProp<any>;
}) {
	const [profile, setProfile] = useState<TProfileAll>();

	const fetchData = async () => {
		try {
			var res = await profileService.getProfileByIdEmbedAll(
				route.params?.id ?? 0
			);
			navigation.setOptions({
				title: "Profile " + res?.profile.username ?? "Profile",
			});
			setProfile(res.profile);
		} catch (err) {
			console.log(err);
		}
	};
	
	useEffect(() => {
		fetchData();
	}, []);

	const updateLikedByCount = (workoutId: number, newLikedBy: any[]) => {
		setProfile(prevProfile => {
			if (prevProfile) {
				return {
					...prevProfile,
					workouts: prevProfile.workouts?.map(workout => {
						if (workout.id === workoutId) {
							return { ...workout, likedBy: newLikedBy };
						}
						return workout;
					})
				};
			}
			return prevProfile;
		});
	  };

	return (
		<>
			<FlatList
				className="bg-white p-6"
				refreshControl={
					<RefreshControl refreshing={false} onRefresh={() => fetchData()} />
				}
				data={profile?.workouts}
				nestedScrollEnabled={true}
				keyExtractor={(item) => (item.id as number).toString()}
				ListHeaderComponent={() => (
					<>
						<View className="mb-5">
							<View className="items-center">
								<Text className="p-1">
									<EvilIcons name="user" size={100}/>
								</Text>
								<Text className="font-bold text-xl text-gray-800">
									{profile?.username ?? "unknown"}
								</Text>
							</View>

							<View className="flex flex-row justify-between w-8/12 mx-auto my-2 divide-x-2 divide-gray-100 py-2">
								<View className="w-6/12">
									<Text className="text-center font-bold text-lg">
										{profile?.following?.length ?? 0}
									</Text>
									<Text className="text-center text-sm">
										Following
									</Text>
								</View>

								<View className="w-6/12">
									<Text className="text-center font-bold text-lg">
										{profile?.followedBy?.length ?? 0}
									</Text>
									<Text className="text-center text-sm">
										Followers
									</Text>
								</View>
							</View>
							
						</View>
					</>
				)}
				ListEmptyComponent={() => (
					<View>
						<Text className="mt-12 text-lg text-center text-gray-600 mb-4">
							You didn't work out yet! What are you waiting for?
						</Text>
					</View>
				)}
				renderItem={({ item }) => (
					<Workout key={item.id} workout={item} navigation={navigation} updateLikeCount={updateLikedByCount} />
				)}

				// Add a margin-bottom under the last rendered item
				ListFooterComponent={() => <View className="mb-10" />}
			/>
		</>
	);
}
