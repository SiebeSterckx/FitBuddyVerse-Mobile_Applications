import {
	Exercise as PrismaExercise,
} from "@prisma/client";

export class Exercise {
	readonly id: number;
	readonly name: string;
	readonly type: string;
	readonly equipment: string;
	readonly description: string;

	constructor({
		id,
		name,
		type,
		equipment,
		description
	}: Exercise) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.equipment = equipment;
		this.description = description;
	}

	static From(
		exercise: PrismaExercise
	): Exercise {
		return new Exercise(exercise);
	}
}
