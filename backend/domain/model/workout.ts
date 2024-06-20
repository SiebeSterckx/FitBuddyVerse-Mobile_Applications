import { WorkoutComment } from "../model/comment";
import { Profile } from "../model/profile";
import { WorkoutDetails } from "./details";
import {
	WorkoutComment as PrismaWorkoutComment,
	WorkoutDetails as PrismaWorkoutDetails,
	Workout as PrismaWorkout,
	Profile as PrismaProfile,
} from "@prisma/client";

export class Workout {
	readonly id?: number;
	readonly name: string;
	readonly createdAt: Date;
	readonly durationSec: number;
	readonly volumeKG: number;
	readonly profileId: number;
	readonly workoutComments?: WorkoutComment[];
	readonly likedBy?: Profile[];
	readonly profile?: Profile;
	readonly workoutDetails?: WorkoutDetails[];

	constructor({
		id,
		name,
		createdAt,
		durationSec,
		volumeKG,
		profileId,
		workoutComments,
		likedBy,
		profile,
		workoutDetails,
	}: Workout) {
		this.id = id;
		this.name = name;
		this.createdAt = createdAt;
		this.durationSec = durationSec;
		this.volumeKG = volumeKG;
		this.profileId = profileId;
		this.workoutComments = workoutComments;
		this.likedBy = likedBy;
		this.profile = profile;
		this.workoutDetails = workoutDetails;
	}

	static From(
		workout: PrismaWorkout & { WorkoutComment?: PrismaWorkoutComment[] } & {
			WorkoutDetails?: PrismaWorkoutDetails[];
		} & { LikedBy?: PrismaProfile[] } & { profile?: PrismaProfile }
	): Workout {
		return new Workout({
			...workout,
			workoutComments: workout?.WorkoutComment?.map(WorkoutComment.From),
			workoutDetails: workout?.WorkoutDetails?.map(WorkoutDetails.From),
			likedBy: workout?.LikedBy?.map(Profile.From),
			profile: workout.profile ? Profile.From(workout.profile) : null,
		});
	}
}