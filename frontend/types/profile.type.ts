import { TWorkoutComment } from './comment.type';
import { TWorkout } from './workout.type';

export type TProfileAll = {
    id: number;
    email: string;
    username: string;
    password: string;
    workouts?: TWorkout[];
    workoutComments?: TWorkoutComment[];
    profilePicture?: string;
    followedBy?: TProfileAll[];
    following?: TProfileAll[];
};

export type TProfile = {
    id?: number;
    email: string;
    username: string;
    password: string;
    profilePicture?: string;
};
