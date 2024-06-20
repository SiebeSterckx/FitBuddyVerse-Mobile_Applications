export type TWorkoutComment = {
    id: number;
    workoutId: number;
    profileId: number;
    message: string;
    createdAt: string;
    profile: {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
    };
};
