import { WorkoutComment } from "../model/comment";
import { Workout } from "../model/workout";
import {
	Profile as PrismaProfile,
	Workout as PrismaWorkout,
	WorkoutComment as PrismaWorkoutComment,
} from "@prisma/client";

export class Profile {
	readonly id?: number;
	readonly email: string;
	readonly username: string;
	readonly password: string;
	readonly workouts?: Workout[];
	readonly workoutComments?: WorkoutComment[];
	readonly followedBy?: Profile[];
	readonly following?: Profile[];
	readonly profilePicture?: string;
	readonly likedWorkouts?: Workout[];

	constructor({
		id,
		email,
		username,
		password,
		workouts,
		workoutComments,
		followedBy,
		following,
		likedWorkouts,
	}: Profile) {
		this.id = id;
		this.email = email;
		this.username = username;
		this.password = password;
		this.workouts = workouts;
		this.workoutComments = workoutComments;
		this.followedBy = followedBy;
		this.following = following;
		this.likedWorkouts = likedWorkouts;
	}

	static From(
		profile: PrismaProfile & {
			Workout?: PrismaWorkout[];
		} & {
			WorkoutComment?: PrismaWorkoutComment[];
		} & {
			following?: PrismaProfile[];
		} & {
			followedBy?: PrismaProfile[];
		} & {
			LikedWorkouts?: PrismaWorkout[];
		}
	): Profile {
		return new Profile({
			...profile,
			following: profile?.following?.map(Profile.From),
			followedBy: profile?.followedBy?.map(Profile.From),
			workouts: profile?.Workout?.map(Workout.From),
			workoutComments: profile?.WorkoutComment?.map(WorkoutComment.From),
			likedWorkouts: profile?.LikedWorkouts?.map(Workout.From),
		});
	}
}