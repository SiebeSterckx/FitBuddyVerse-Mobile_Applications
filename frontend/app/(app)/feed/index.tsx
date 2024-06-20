import Workout from "@/components/workout/Workout";
import workoutService from "@/lib/workoutService";
import { TProfile } from "@/types/profile.type";
import { TWorkout } from "@/types/workout.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { FlatList, RefreshControl, Text, View, BackHandler, Platform } from "react-native";


export default function FeedPage({ navigation }: { navigation: NavigationProp<any> }) {
	const [workouts, setWorkouts] = useState<TWorkout[]>();
  
	const updateLikedByCount = (workoutId: number, newLikedBy: any[]) => {
		setWorkouts(prevWorkouts =>
		prevWorkouts?.map(workout => {
			if (workout.id === workoutId) {
			  return { ...workout, likedBy: newLikedBy }; // Update the likedBy array for the specific workout
			}
			return workout;
		  })
		);
	  };

	var fetchData = async () => {
	  try {
		const p = JSON.parse((await AsyncStorage.getItem("profile")) ?? "{}") as TProfile;
  
		// Fetch profiles of users being followed
		var res = await workoutService.getProfileFeed(p?.id ?? 0);
		setWorkouts(res);
		
	  } catch (err) {
		console.log(err);
	  }
	};

	useFocusEffect(useCallback(() => {
		fetchData();
	}, []));
  
	return (
	  <>
		{/* FlatList component for rendering a scrollable list of workouts */}
		<FlatList
		  className="bg-white p-6"
		  refreshControl={
			// Pull-to-refresh functionality with a RefreshControl component
			<RefreshControl refreshing={false} onRefresh={() => fetchData()} />
		  }
		data={workouts ?? []}
		  nestedScrollEnabled={true}
		  keyExtractor={(item) => (item.id as number).toString()}
  
		  // Header component with introductory text
		  ListHeaderComponent={() => (
			<View>
			  <Text className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
				Your Feed
			  </Text>
			  <Text className="mt-2 text-lg text-gray-600 mb-4">
				Workouts of all your following will appear here.
			  </Text>
			</View>
		  )}
  
		  // When the feed is empty
		  ListEmptyComponent={() => (
			<View>
			  <Text className="mt-12 text-lg text-center text-gray-600 mb-4">
				All the people that you follow haven't worked out yet, so you can't see anything here.
			  </Text>
			</View>
		  )}
  
		  // Render each workout using the Workout component
		  renderItem={({ item }) => (
			<Workout key={item.id} workout={item} navigation={navigation} updateLikeCount={updateLikedByCount} />
		  )}
  
		  // Add a margin-bottom under the last rendered item
		  ListFooterComponent={() => <View className="mb-10" />}
		/>
	  </>
	);
  }
  