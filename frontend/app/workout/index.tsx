import workoutService from "@/lib/workoutService";
import { TWorkout } from "@/types/workout.type";
import { RouteProp } from "@react-navigation/native";
import { format } from "date-fns";
import moment from "moment";
import React, { useEffect } from "react";
import { View, Text,  ScrollView } from "react-native";

const formatDuration = (durationSec: number) => {
	const duration = moment.duration(durationSec, "seconds");
	return `${duration.hours()}h ${duration.minutes()}m`;
};

export default function WorkoutDetailsPage({
	route
}: {
	route: RouteProp<any>;
}) {
	const [workout, setWorkout] = React.useState<TWorkout>();

	useEffect(() => {
		(async () => {
			try {
				// Fetch exercise details using the exerciseService
				const workout = await workoutService.getWorkoutDetailsById(route.params?.id);
				setWorkout(workout);
			} catch (error) {
				console.error("Error fetching workout:", error);
			}
		})();
	}, []);

	return (
		<ScrollView className="bg-white px-4">
					<View>
						<Text className="text-lg">{workout?.profile?.username}</Text>
						<Text className="text-sm">
							{workout?.createdAt
								? format(
										new Date(workout.createdAt),
										"dd MMMM yyyy, kk:mm"
									)
								: null}
						</Text>
					</View>

					<View className="my-2 w-full">
						<Text className="text-xl font-bold">{workout?.name}</Text>
						<View className="flex flex-row justify-between border-t-2 border-b-2 border-gray-200 py-2">
							<View>
								<Text>Time</Text>
								<Text>{formatDuration(workout?.durationSec ?? 0)}</Text>
							</View>
							<View>
								<Text>Volume</Text>
								<Text>{workout?.volumeKG} kg</Text>
							</View>
							<View>
								<Text>Sets</Text>
								<Text>
									{workout?.workoutDetails?.map((exercise) => exercise.exerciseSets).flat().length}
								</Text>
							</View>
						</View>
					</View>

					<View className="w-full">
						<Text>Workout</Text>
						<View className="my-2">
							{workout?.workoutDetails?.map((details) => (
								<View className="mb-2" key={details.id}>
									<View className="mb-2">
										<Text className="text-lg font-extrabold">
											{details.exercise?.name}
										</Text>
										{details.note ? (
											<Text>{details.note}</Text>
										) : null}
									</View>
									<View className="flex flex-row justify-between">
										<Text>SET</Text>
										<Text>WEIGHT & REPS</Text>
									</View>

									{details?.exerciseSets?.map((set) => (
										<View
											className="flex flex-row justify-between"
											key={set.id}
										>
											<Text>{set.setNr}</Text>
											<Text>
												{set.weightKG} kg x {set.repetitions} reps
											</Text>
										</View>
									))}
								</View>
							))}
						</View>
					</View>
		</ScrollView>
	);
}
