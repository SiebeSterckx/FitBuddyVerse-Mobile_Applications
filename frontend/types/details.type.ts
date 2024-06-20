import { TExercise } from "./exercise.type";
import { TExerciseSet } from "./set.type";

export type TWorkoutDetails = {
    id?: number;
    workoutId?: number;
    exerciseId: number;
    note?: string | null;
    exerciseSets?: TExerciseSet[];
    exercise?: TExercise;
};