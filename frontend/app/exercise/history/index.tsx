import exerciseService from "@/lib/exerciseService";
import { useEffect, useState } from "react";
import { View } from "react-native";
import History from "../../../components/exercise/History";
import { TWorkout } from "@/types/workout.type";
import { NavigationProp } from "@react-navigation/native";

export default function ExerciseHistoryPage({
	route,
	navigation,
}: {
	route: any;
	navigation: NavigationProp<any>;
}) {
	const { id, userid, name } = route.params;
	const [exerciseHistory, setExerciseHistory] = useState<TWorkout[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Fetch exercise details using the exerciseService
				const res = await exerciseService.getExerciseHistory(
					id,
					userid
				);
				setExerciseHistory(res);
				navigation.setOptions({
					title: name + " History",
				});

			} catch (error) {
				console.error("Error fetching exercise details:", error);
			}
		};
		fetchData();
	}, []);

	return (
		<>
			<View className="bg-white h-full">
				<History workouts={exerciseHistory} />
			</View>
		</>
	);
}
