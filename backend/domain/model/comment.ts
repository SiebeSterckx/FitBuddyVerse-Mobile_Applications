import {
	Workout as PrismaWorkout,
	Profile as PrismaProfile,
	WorkoutComment as PrismaWorkoutComment,
} from "@prisma/client"; 
import { Profile } from "./profile";
import { Workout } from "./workout";

export class WorkoutComment {
	readonly id: number;
	readonly workoutId: number;
	readonly profileId: number;
	readonly message: string;
	readonly createdAt: Date;
	readonly profile?: Profile;
	readonly workout?: Workout;
 
	constructor({
		id,
		workoutId,
		profileId,
		message,
		createdAt,
		profile,
		workout,
	}: WorkoutComment) {
		this.id = id;
		this.workoutId = workoutId;
		this.profileId = profileId;
		this.message = message;
		this.createdAt = createdAt;
		this.profile = profile;
		this.workout = workout;
	}
 
	static From(
		workoutComment: PrismaWorkoutComment & { profile?: PrismaProfile } & {
			workout?: PrismaWorkout;
		}
	): WorkoutComment {
		return new WorkoutComment({
			...workoutComment,
			profile: workoutComment?.profile
				? Profile.From(workoutComment.profile)
				: null,
			workout: workoutComment?.workout
				? Workout.From(workoutComment.workout)
				: null,
		});
	}
}
