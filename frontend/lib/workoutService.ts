import { TWorkoutExercise } from "@/types/workout.type";
import axios from "axios";

const getWorkoutDetailsById = async (id: string) => {
	return (
		await axios.get(
			process.env.EXPO_PUBLIC_URL + `/workouts/${id}/workout-page`
		)
	).data.workout;
};

const createWorkout = async (workout: TWorkoutExercise) => {
	return (
		await axios.post(process.env.EXPO_PUBLIC_URL + `/workouts/create`, workout)
	).data;
};

const getProfileFeed = async (profileId: number) => {
	return (
		await axios.get(
			process.env.EXPO_PUBLIC_URL + `/workouts/${profileId}/feed`
		)
	).data.workouts;
};

const likeWorkout = async (workoutId: number, profileId: number, type: string) => {
	return (
		await axios.get(
			process.env.EXPO_PUBLIC_URL + `/workouts/${workoutId}/${type}/${profileId}`
		)
	).data;
};

const placeComment = async (workoutId: number, profileId: number, message: string) => {	
	return (
		await axios.post(
			process.env.EXPO_PUBLIC_URL + `/workouts/${workoutId}/comment/${profileId}`,
			{ message }
		)
	).data;
}

const getAllWorkoutDetailsById = async (id: string) => {
	return (
		await axios.get(
			process.env.EXPO_PUBLIC_URL + `/workouts/${id}?embed=all`
		)
	).data.workout;
}

const getWorkoutCommentsById = async (id: string) => {
	return (
		await axios.get(
			process.env.EXPO_PUBLIC_URL + `/workouts/${id}/comments`
		)
	).data.comments;
}


export default {
	getWorkoutDetailsById,
	createWorkout,
	getProfileFeed,
	likeWorkout,
	placeComment,
	getAllWorkoutDetailsById,
	getWorkoutCommentsById
};
