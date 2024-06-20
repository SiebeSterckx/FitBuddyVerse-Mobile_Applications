import { TWorkoutComment } from './comment.type';
import { TWorkoutDetails } from './details.type';
import { TProfile } from './profile.type';

export type TWorkout = {
    id: number;
    name: string;
    createdAt: string;
    durationSec: number;
    volumeKG: number;
    profileId: number;
    profile?: TProfile;
    workoutDetails?: TWorkoutDetails[];
    workoutComments?: TWorkoutComment[];
    likedBy?: TProfile[];
};

export type TWorkoutExercise = {
    id?: number;
    name: string;
    createdAt: string;
    durationSec: number;
    volumeKG: number;
    profileId: number;
    completed?: boolean;
    workoutDetails?: TWorkoutDetails[];
};