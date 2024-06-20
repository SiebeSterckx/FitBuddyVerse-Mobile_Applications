
import {ExerciseSet as PrismaExerciseSet} from "@prisma/client";

export class ExerciseSet {
	readonly id: number;
	readonly workoutDetailsId: number;
	readonly setNr: number;
	readonly repetitions: number;
	readonly weightKG: number;

	constructor({
		id,
		workoutDetailsId,
		setNr,
		repetitions,
		weightKG,
	}: ExerciseSet) {
		this.id = id;
		this.workoutDetailsId = workoutDetailsId;
		this.setNr = setNr;
		this.repetitions = repetitions;
		this.weightKG = weightKG;
	}

	static From(
		exerciseSet: PrismaExerciseSet
	): ExerciseSet {
		return new ExerciseSet(exerciseSet);
	}
}