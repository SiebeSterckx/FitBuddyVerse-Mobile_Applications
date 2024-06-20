import { Workout } from "../domain/model/workout";
import workoutDB from "../domain/data-access/workout.db";
import { WorkoutDetails } from "@/domain/model/details";
import { parse } from "path";

type TInputWorkout = {
	id?: number;
	name: string;
	durationSec: number;
	createdAt: Date;
	volumeKG: number;
	profileId: number;
	WorkoutDetails?: WorkoutDetails[];
};

const getWorkoutByIdIncludeAll = async ({
	id,
}: {
	id: string;
}): Promise<Workout> => {
	if (!Number.isInteger(parseInt(id)))
		throw new Error("Id must be numeric and whole");
	const workout = workoutDB.getWorkoutByIdIncludeAll(parseInt(id));
	return workout;
};

const getWorkoutById = async ({ id }: { id: string }): Promise<Workout> => {
	if (!Number.isInteger(parseInt(id)))
		throw new Error("Id must be numeric and whole");
	return workoutDB.getWorkoutById(parseInt(id));
};

const getWorkoutByIdForWorkoutPage = async ({ id }: { id: string }) => {
	if (!Number.isInteger(parseInt(id)))
		throw new Error("Id must be numeric and whole");
	const workout = await workoutDB.getWorkoutByIdForWorkoutPage(parseInt(id));
	return workout;
};

const createWorkout = async (workout: TInputWorkout) => {
	return await workoutDB.createWorkout(new Workout(workout));
};

const getAllFollowingWorkouts = async (profileId: string): Promise<Workout[]> => {
	if (!Number.isInteger(parseInt(profileId)))
		throw new Error("Id must be numeric and whole");
	return await workoutDB.getAllFollowingWorkouts(parseInt(profileId));
}

const likeWorkout = async (workoutId: string, profileId: string, type: string) => {
	if (!Number.isInteger(parseInt(workoutId)))
		throw new Error("Id must be numeric and whole");
	if (!Number.isInteger(parseInt(profileId)))
		throw new Error("Id must be numeric and whole");
	if (type !== "like" && type !== "unlike")
		throw new Error("Type must be like or unlike");
	return await workoutDB.likeWorkout(parseInt(workoutId), parseInt(profileId), type);
}

const placeComment = async (workoutId: string, profileId: string, message: string) => {
	if (!Number.isInteger(parseInt(workoutId)))
		throw new Error("Id must be numeric and whole");
	if (!Number.isInteger(parseInt(profileId)))
		throw new Error("Id must be numeric and whole");
	return await workoutDB.placeComment(parseInt(workoutId), parseInt(profileId), message);
}

const getWorkoutCommentsById = async (id: string) => {
	if (!Number.isInteger(parseInt(id)))
		throw new Error("Id must be numeric and whole");
	const comments = await workoutDB.getWorkoutCommentsById(parseInt(id));
	return comments;
}


export default {
	getWorkoutByIdIncludeAll,
	getWorkoutById,
	getWorkoutByIdForWorkoutPage,
	createWorkout,
	getAllFollowingWorkouts,
	likeWorkout,
	placeComment,
	getWorkoutCommentsById
};