export type TExerciseSet = {
    id?: number;
    workoutDetailsId?: number;
    setNr: number;
    repetitions: number;
    weightKG: number;
    isCompleted?: boolean;
};
