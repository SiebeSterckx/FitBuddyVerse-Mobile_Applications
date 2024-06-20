import { TWorkout } from "@/types/workout.type";
import { format } from "date-fns";
import React, { FC } from "react";
import { ScrollView, Text, View } from "react-native";

const History: FC<{ workouts: TWorkout[]}> = ({workouts}) => {

	if (!workouts || workouts.length === 0) {
		return (
			<View className="flex h-full justify-center items-center mx-10">
				<View className="bg-slate-400/20 p-4 rounded-md">
					<Text className="text-center font-bold text-lg">
						You don't have any workouts with this exercise.
					</Text>
				</View>
			</View>
		);
	}
	return (
		<>
			<ScrollView>
				{workouts?.map((workout: any) => (
					<View
						key={workout.workoutId}
						className="bg-white px-4 pt-4 rounded-lg shadow-md"
					>
						<View className="mb-4">
							<Text className="text-lg font-semibold">
								{workout.workout.name}
							</Text>
							<Text className="text-sm text-gray-500 block">
								{format(
									new Date(workout.workout.createdAt),
									"dd MMMM yyyy, kk:mm"
								)}
							</Text>
						</View>
						<View className="mb-4">
							<View className="flex flex-row items-center justify-between mb-2 bg-slate-400/20 p-2 rounded-md">
								<View>
									<Text className="text-md font-semibold">
										{workout.exercise.name}
									</Text>
									{workout.note ? (
										<Text className="text-md">{workout.note}</Text>
									) : null}
								</View>
								<Text className="text-sm">{`${workout.ExerciseSet.length} sets`}</Text>
							</View>

							<View className="flex flex-row items-center justify-between p-2">
								<Text className="text-sm">SET</Text>
								<Text className="text-sm">WEIGHT & REPS</Text>
							</View>
							<View className="space-y-2 p-2">
								{workout.ExerciseSet.map((set: any) => (
									<View
										key={set.id}
										className="flex flex-row justify-between"
									>
										<Text>{set.setNr}</Text>
										<Text>{`${set.weightKG}kg x ${set.repetitions} reps`}</Text>
									</View>
								))}
							</View>
						</View>
					</View>
				))}
			</ScrollView>
		</>
	);
}

export default History;
