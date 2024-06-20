import {WorkoutDetails as PrismaWorkoutDetails, Exercise as PrismaExercise, ExerciseSet as PrismaExerciseSet, Workout as PrismaWorkout} from "@prisma/client";
import { Exercise } from "./exercise";
import { Workout } from "./workout";
import { ExerciseSet } from "./set";

export class WorkoutDetails {
	readonly id: number;
	readonly note: string;
	readonly workoutId: number;
	readonly exerciseId: number;
	readonly exercise?: Exercise;
	readonly workout?: Workout;
	readonly exerciseSets?: ExerciseSet[];

	

	constructor({ id, note, workoutId, exerciseId, exercise, workout, exerciseSets }: WorkoutDetails) {
		this.id = id;
		this.note = note;
		this.workoutId = workoutId;
		this.exerciseId = exerciseId;
		this.exercise = exercise;
		this.workout = workout;
		this.exerciseSets = exerciseSets;
	}

	static From(workoutDetails: PrismaWorkoutDetails & { exercise?: PrismaExercise} & { workout?: PrismaWorkout} & { ExerciseSet?: PrismaExerciseSet[]} ): WorkoutDetails {
		return new WorkoutDetails({
			...workoutDetails,
			exerciseSets: workoutDetails?.ExerciseSet?.map(ExerciseSet.From),
		});
	}
}
