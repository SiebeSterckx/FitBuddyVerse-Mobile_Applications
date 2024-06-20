import database from "./prisma/db";
import { Exercise } from "../model/exercise";
import { WorkoutDetails } from "../model/details";

const getExerciseById = async (id: number): Promise<Exercise> => {
	const exercise = await database.exercise.findUnique({
		where: {
			id: id,
		},
	});
	return Exercise.From(exercise);
};

const getAllExercises = async (): Promise<Exercise[]> => {
	const exercises = await database.exercise.findMany();
	return exercises.map(Exercise.From);
};

const getWorkoutGraphForExercise = async (
	exerciseId: number,
	profileId: number
) => database.$queryRaw`select
    w.id,
    w."volumeKG",
    w."createdAt",
    max(
    e."weightKG" * (1 + e.repetitions::float / 30)
    ) as one_rep_max,
    max(e."weightKG") as max_weight,
    sum(e.repetitions)::integer as total_reps,
    max(e."weightKG" * e.repetitions) as best_set_volume
    from
    "Workout" w
    join "WorkoutDetails" wd on w.id = wd."workoutId"
    join "ExerciseSet" e on wd.id = e."workoutDetailsId"
    where
    wd."exerciseId" = ${exerciseId}
    and w."profileId" = ${profileId}
    group by
    w.id,
    w."volumeKG",
    w."createdAt"
    order by "createdAt"`;

const getPersonalBestForExercise = async (
	exerciseId: number,
	profileId: number
) =>
	database.$queryRaw`SELECT 
  ROUND(max(es."weightKG" * (1 + es.repetitions::float / 30))::numeric, 2) as best_one_rep_max, 
  max(es."weightKG") as heaviest_weight, MAX(es.repetitions)::integer as best_reps, 
  max(es."weightKG" * es.repetitions) as best_set_volume,
  (
        SELECT 
            MAX(es_inner."weightKG") || 'x' || MAX(es_inner.repetitions)::integer
        FROM 
            "Workout" w_inner
        LEFT JOIN 
            "WorkoutDetails" wd_inner ON w_inner.id = wd_inner."workoutId"
        LEFT JOIN 
            "ExerciseSet" es_inner ON wd_inner.id = es_inner."workoutDetailsId"
        WHERE 
            w_inner."profileId" = ${profileId}
            AND wd_inner."exerciseId" = ${exerciseId}
            AND es_inner."weightKG" * es_inner.repetitions = MAX(es."weightKG" * es.repetitions)
        GROUP BY
            es_inner."weightKG", es_inner.repetitions
        LIMIT 1
    ) as set_volume_string
  FROM "Workout" w
  LEFT JOIN "WorkoutDetails" wd ON w.id = wd."workoutId"
  LEFT JOIN "ExerciseSet" es ON wd.id = es."workoutDetailsId"
  WHERE "profileId" = ${profileId} AND wd."exerciseId" = ${exerciseId}
  LIMIT 1`;

const getExerciseHistory = async (
	exerciseId: number,
	profileId: number
) => {
  const exerciseHistory = await database.workoutDetails.findMany({
    where: {
      exerciseId: exerciseId,
      workout: {
        profileId: profileId
      }
    },
    include: {
      workout: true,
      exercise: true,
      ExerciseSet: true
    }, 
    orderBy: {
      workout: {
        createdAt: 'desc'
      }
    }
  });

  return exerciseHistory;
}

export default {
	getExerciseById,
	getWorkoutGraphForExercise,
	getPersonalBestForExercise,
	getExerciseHistory,
	getAllExercises,
};