// Execute: npx ts-node init-db.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  console.log("Connected");
  // Use the prisma API to fill the database with some initial data
  await prisma.profile.createMany({
    data: [{
      email: "nino@example.com",
      username: "Nino",
      password: "t",
    },
    {
      email: "siebe@example.com",
      username: "Siebe",
      password: "t",
    },
    {
      email: "michiel@example.com",
      username: "Michiel",
      password: "t",
    },
    {
      email: "arno@example.com",
      username: "Arno",
      password: "t",
    }
    ]
  });

  await prisma.exercise.createMany({
    data: [{
      name: "Bench Press",
      type: "Chest",
      equipment: "Dumbbell",
      description: "Bench press is an exercise for the chest muscles. Lie on a bench and grip the bar. Lower the bar to your chest and push it back up.",
    },
    {
      name: "Preacher Curl",
      type: "Biceps",
      equipment: "Dumbbell",
      description: "Preacher curl is an exercise for the biceps muscles. Sit on a preacher bench and grip the bar. Curl the bar up and down.",
    },
    {
      name: "Rope Pushdown",
      type: "Triceps",
      equipment: "Cable",
      description: "Rope pushdown is an exercise for the triceps muscles. Stand in front of a cable machine and grip the rope. Push the rope down and up.",
    },
    {
      name: "Seated Row",
      type: "Back",
      equipment: "Machine",
      description: "Seated row is an exercise for the back muscles. Sit on the machine and grip the handles. Pull the handles towards you and push them back out.",
    },
    {
      name: "Shoulder Press",
      type: "Shoulders",
      equipment: "Barbell",
      description: "Shoulder press is an exercise for the shoulder muscles. Sit on a bench and grip the bar. Push the bar up and down.",
    },
    {
      name: "Squat",
      type: "Legs",
      equipment: "Barbell",
      description: "Squat is an exercise for the leg muscles. Stand with your feet shoulder width apart and grip the bar. Squat down and up.",
    },
    {
      name: "Deadlift",
      type: "Legs",
      equipment: "Barbell",
      description: "Deadlift is an exercise for the leg muscles. Stand with your feet shoulder width apart and grip the bar. Lift the bar up and down.",
    },
    {
      name: "Leg Press",
      type: "Legs",
      equipment: "Machine",
      description: "Leg press is an exercise for the leg muscles. Sit on the machine and place your feet on the platform. Push the platform away from you and pull it back in.",
    },
    {
      name: "Leg Curl",
      type: "Legs",
      equipment: "Machine",
      description: "Leg curl is an exercise for the leg muscles. Lie on the machine and place your feet under the pads. Curl your legs up and down.",
    },
    {
      name: "Leg Extension",
      type: "Legs",
      equipment: "Machine",
      description: "Leg extension is an exercise for the leg muscles. Sit on the machine and place your feet under the pads. Push the pads up and down.",
    },
    {
      name: "Calf Raise",
      type: "Legs",
      equipment: "Machine",
      description: "Calf raise is an exercise for the calf muscles. Stand on the machine and place your shoulders under the pads. Push the pads up and down.",
    },
    {
      name: "Crunch",
      type: "Abs",
      equipment: "Bodyweight",
      description: "Crunch is an exercise for the abdominal muscles. Lie on the ground with your knees bent and place your hands behind your head. Lift your upper body up and down.",
    },
    {
      name: "Plank",
      type: "Abs",
      equipment: "Bodyweight",
      description: "Plank is an exercise for the abdominal muscles. Lie on the ground with your elbows under your shoulders. Lift your body up and hold.",
    },
    {
      name: "Russian Twist",
      type: "Abs",
      equipment: "Bodyweight",
      description: "Russian twist is an exercise for the abdominal muscles. Sit on the ground with your knees bent and your feet off the ground. Twist your upper body from side to side.",
    },
    {
      name: "Side Plank",
      type: "Abs",
      equipment: "Bodyweight",
      description: "Side plank is an exercise for the abdominal muscles. Lie on the ground with your elbow under your shoulder. Lift your body up and hold.",
    },
    {
      name: "Bent Over Row",
      type: "Back",
      equipment: "Barbell",
      description: "Bent over row is an exercise for the back muscles. Stand with your feet shoulder width apart and grip the bar. Pull the bar towards you and push it back out.",
    },
    {
      name: "Lat Pulldown",
      type: "Back",
      equipment: "Machine",
      description: "Lat pulldown is an exercise for the back muscles. Sit on the machine and grip the bar. Pull the bar down and up.",
    },
    {
      name: "Pull Up",
      type: "Back",
      equipment: "Bodyweight",
      description: "Pull up is an exercise for the back muscles. Hang from a bar with your hands shoulder width apart. Pull yourself up and down.",
    },
    {
      name: "Chin Up",
      type: "Back",
      equipment: "Bodyweight",
      description: "Chin up is an exercise for the back muscles. Hang from a bar with your hands shoulder width apart and your palms facing towards you. Pull yourself up and down.",
    },
    {
      name: "Dumbbell Curl",
      type: "Biceps",
      equipment: "Dumbbell",
      description: "Dumbbell curl is an exercise for the biceps muscles. Stand with your feet shoulder width apart and grip the dumbbells. Curl the dumbbells up and down.",
    },
    {
      name: "Hammer Curl",
      type: "Biceps",
      equipment: "Dumbbell",
      description: "Hammer curl is an exercise for the biceps muscles. Stand with your feet shoulder width apart and grip the dumbbells. Curl the dumbbells up and down.",
    },
    {
      name: "Concentration Curl",
      type: "Biceps",
      equipment: "Dumbbell",
      description: "Concentration curl is an exercise for the biceps muscles. Sit on a bench and grip the dumbbell. Curl the dumbbell up and down.",
    },
    {
      name: "Triceps Extension",
      type: "Triceps",
      equipment: "Dumbbell",
      description: "Triceps extension is an exercise for the triceps muscles. Lie on a bench and grip the dumbbell. Extend your arm up and down.",
    },
    {
      name: "Triceps Kickback",
      type: "Triceps",
      equipment: "Dumbbell",
      description: "Triceps kickback is an exercise for the triceps muscles. Stand with your feet shoulder width apart and grip the dumbbell. Extend your arm up and down.",
    },
    {
      name: "Triceps Dip",
      type: "Triceps",
      equipment: "Bodyweight",
      description: "Triceps dip is an exercise for the triceps muscles. Sit on a bench and grip the edge. Extend your legs out and push yourself up and down.",
    },
    {
      name: "Arnold Press",
      type: "Shoulders",
      equipment: "Dumbbell",
      description: "Arnold press is an exercise for the shoulder muscles. Sit on a bench and grip the dumbbells. Push the dumbbells up and down.",
    },
    {
      name: "Lateral Raise",
      type: "Shoulders",
      equipment: "Dumbbell",
      description: "Lateral raise is an exercise for the shoulder muscles. Stand with your feet shoulder width apart and grip the dumbbells. Raise the dumbbells up and down.",
    },
    {
      name: "Front Raise",
      type: "Shoulders",
      equipment: "Dumbbell",
      description: "Front raise is an exercise for the shoulder muscles. Stand with your feet shoulder width apart and grip the dumbbells. Raise the dumbbells up and down.",
    },
    {
      name: "Shrug",
      type: "Shoulders",
      equipment: "Dumbbell",
      description: "Shrug is an exercise for the shoulder muscles. Stand with your feet shoulder width apart and grip the dumbbells. Shrug your shoulders up and down.",
    },
    {
      name: "Dumbbell Fly",
      type: "Chest",
      equipment: "Dumbbell",
      description: "Dumbbell fly is an exercise for the chest muscles. Lie on a bench and grip the dumbbells. Lower the dumbbells to your sides and push them back up.",
    },
    ]
  });

  await prisma.workout.createMany({
    data: [
      // Workout 1
      {
        id: 1000,
        name: "Nino's Beste Workout 1",
        durationSec: 2530,
        volumeKG: 10300,
        profileId: 1,
        createdAt: "2024-01-02T20:01:11.025Z",
      },
      // Workout 2
      {
        id: 1001,
        name: "Nino's Beste Workout 2",
        durationSec: 2000,
        volumeKG: 8500,
        profileId: 1,
        createdAt: "2023-12-22T22:24:11.025Z",
      },
      // Workout 3
      {
        id: 1002,
        name: "Nino's Beste Workout 3",
        durationSec: 1800,
        volumeKG: 7500,
        profileId: 1,
        createdAt: "2023-11-15T13:01:11.025Z",
      },
      // Workout 4
      {
        id: 1003,
        name: "Epische Workout 1",
        durationSec: 2398,
        volumeKG: 9230,
        profileId: 2,
        createdAt: "2023-10-29T15:01:11.025Z",
      },
      // Workout 5
      {
        id: 1004,
        name: "Epische Workout 2",
        durationSec: 2100,
        volumeKG: 8000,
        profileId: 2,
        createdAt: "2023-12-29T15:01:11.025Z",
      },
      // Workout 6
      {
        id: 1005,
        name: "Epische Workout 3",
        durationSec: 1800,
        volumeKG: 7000,
        profileId: 2,
        createdAt: "2023-11-02T04:55:11.025Z",
      },
      // Workout 7
      {
        id: 1006,
        name: "Zware Workout 1",
        durationSec: 1290,
        volumeKG: 5302,
        profileId: 3,
        createdAt: "2023-11-02T04:55:11.025Z",
      },
      // Workout 8
      {
        id: 1007,
        name: "Zware Workout 2",
        durationSec: 1100,
        volumeKG: 4800,
        profileId: 3,
        createdAt: "2023-12-29T15:01:11.025Z",
      },
      // Workout 9
      {
        id: 1008,
        name: "Zware Workout 3",
        durationSec: 900,
        volumeKG: 4000,
        profileId: 3,
        createdAt: "2023-12-28T05:30:11.025Z",
      },
      // Workout 10
      {
        id: 1009,
        name: "Beste Workout 1",
        durationSec: 1943,
        volumeKG: 12309,
        profileId: 4,
        createdAt: "2023-12-28T12:39:11.025Z",
      },
      // Workout 11
      {
        id: 1010,
        name: "Beste Workout 2",
        durationSec: 1800,
        volumeKG: 11000,
        profileId: 4,
        createdAt: "2024-01-04T11:39:11.025Z",
      },
      // Workout 12
      {
        id: 1011,
        name: "Beste Workout 3",
        durationSec: 1600,
        volumeKG: 10000,
        profileId: 4,
        createdAt: "2024-01-02T09:39:11.025Z",
      },
    ]
  });


  await prisma.workoutDetails.createMany({
    data: [
      // Exercices for Workout 1
      {
        id: 1000,
        workoutId: 1000,
        exerciseId: 1,
        note: "Dit was een zware workout",
      },
      {
        id: 1001,
        workoutId: 1000,
        exerciseId: 2,
      },
      {
        id: 1002,
        workoutId: 1000,
        exerciseId: 3,
        note: "Deze oefening vergde veel inspanning",
      },
      // Exercices for Workout 2
      {
        id: 1003,
        workoutId: 1001,
        exerciseId: 2,
        note: "Dit was een uitdagende oefening",
      },
      {
        id: 1004,
        workoutId: 1001,
        exerciseId: 4,
        note: "Goed gewerkt tijdens deze workout",
      },
      // Exercices for Workout 3
      {
        id: 1005,
        workoutId: 1002,
        exerciseId: 1,
        note: "Dit was een zware workout",
      },
      {
        id: 1006,
        workoutId: 1002,
        exerciseId: 3,
      },
      {
        id: 1007,
        workoutId: 1002,
        exerciseId: 4,
        note: "Deze oefening vergde veel inspanning",
      },
      // Exercices for Workout 4
      {
        id: 1008,
        workoutId: 1003,
        exerciseId: 1,
      },
      {
        id: 1009,
        workoutId: 1003,
        exerciseId: 3,
        note: "Great effort in this workout",
      },
      {
        id: 1010,
        workoutId: 1003,
        exerciseId: 4,
      },
      // Exercices for Workout 5
      {
        id: 1011,
        workoutId: 1004,
        exerciseId: 2,
        note: "Well done on this exercise",
      },
      {
        id: 1012,
        workoutId: 1004,
        exerciseId: 3,
      },
      {
        id: 1013,
        workoutId: 1004,
        exerciseId: 4,
        note: "You nailed this one!",
      },
      // Exercices for Workout 6
      {
        id: 1014,
        workoutId: 1005,
        exerciseId: 1,
      },
      {
        id: 1015,
        workoutId: 1005,
        exerciseId: 2,
      },
      {
        id: 1016,
        workoutId: 1005,
        exerciseId: 4,
        note: "Impressive performance!",
      },
      // Exercices for Workout 7
      {
        id: 1017,
        workoutId: 1006,
        exerciseId: 2,
        note: "Keep up the good work!",
      },
      {
        id: 1018,
        workoutId: 1006,
        exerciseId: 3,
      },
      {
        id: 1019,
        workoutId: 1006,
        exerciseId: 4,
        note: "Hard work pays off!",
      },
      // Exercices for Workout 8
      {
        id: 1020,
        workoutId: 1007,
        exerciseId: 1,
      },
      {
        id: 1021,
        workoutId: 1007,
        exerciseId: 3,
        note: "Push yourself a bit more next time",
      },
      {
        id: 1022,
        workoutId: 1007,
        exerciseId: 4,
      },
      // Exercices for Workout 9
      {
        id: 1023,
        workoutId: 1008,
        exerciseId: 1,
        note: "You're doing great!",
      },
      {
        id: 1024,
        workoutId: 1008,
        exerciseId: 2,
      },
      {
        id: 1025,
        workoutId: 1008,
        exerciseId: 3,
      },
      // Exercices for Workout 10
      {
        id: 1026,
        workoutId: 1009,
        exerciseId: 1,
      },
      {
        id: 1027,
        workoutId: 1009,
        exerciseId: 2,
        note: "Fantastic job!",
      },
      {
        id: 1028,
        workoutId: 1009,
        exerciseId: 3,
      },
      // Exercices for Workout 11
      {
        id: 1029,
        workoutId: 1010,
        exerciseId: 1,
        note: "You're making progress!",
      },
      {
        id: 1030,
        workoutId: 1010,
        exerciseId: 2,
      },
      // Exercices for Workout 12
      {
        id: 1031,
        workoutId: 1011,
        exerciseId: 1,
      },
      {
        id: 1032,
        workoutId: 1011,
        exerciseId: 2,
        note: "Stay consistent!",
      },
      {
        id: 1033,
        workoutId: 1011,
        exerciseId: 3,
      },
    ]
  });

  await prisma.exerciseSet.createMany({
    data: [
      {
        // Set 1 of Exercise 1 from Workout 1
        id: 1000,
        workoutDetailsId: 1000,
        setNr: 1,
        repetitions: 10,
        weightKG: 27,
      },
      {
        // Set 2 of Exercise 1 from Workout 1
        id: 1001,
        workoutDetailsId: 1000,
        setNr: 2,
        repetitions: 9,
        weightKG: 21,
      },
      {
        // Set 3 of Exercise 1 from Workout 1
        id: 1002,
        workoutDetailsId: 1000,
        setNr: 3,
        repetitions: 10,
        weightKG: 20,
      },
      {
        // Set 1 of Exercise 2 from Workout 1
        id: 1003,
        workoutDetailsId: 1001,
        setNr: 1,
        repetitions: 10,
        weightKG: 10,
      },
      {
        // Set 2 of Exercise 2 from Workout 1
        id: 1004,
        workoutDetailsId: 1001,
        setNr: 2,
        repetitions: 5,
        weightKG: 15,
      },
      {
        // Set 1 of Exercise 3 from Workout 1
        id: 1005,
        workoutDetailsId: 1002,
        setNr: 1,
        repetitions: 5,
        weightKG: 15,
      },
      {
        // Set 2 of Exercise 3 from Workout 1
        id: 1006,
        workoutDetailsId: 1002,
        setNr: 2,
        repetitions: 8,
        weightKG: 14,
      },
      {
        // Set 3 of Exercise 3 from Workout 1
        id: 1007,
        workoutDetailsId: 1002,
        setNr: 3,
        repetitions: 5,
        weightKG: 15,
      },
      {
        // Set 1 of Exercise 1 from Workout 2
        id: 1008,
        workoutDetailsId: 1003,
        setNr: 1,
        repetitions: 15,
        weightKG: 13,
      },
      {
        // Set 1 of Exercise 2 from Workout 2
        id: 1009,
        workoutDetailsId: 1004,
        setNr: 1,
        repetitions: 5,
        weightKG: 15,
      },
      {
        // Set 2 of Exercise 2 from Workout 2
        id: 1010,
        workoutDetailsId: 1004,
        setNr: 2,
        repetitions: 9,
        weightKG: 25,
      },
      {
        // Set 1 of Exercise 1 from Workout 3
        id: 1011,
        workoutDetailsId: 1005,
        setNr: 1,
        repetitions: 8,
        weightKG: 18,
      },
      {
        // Set 2 of Exercise 1 from Workout 3
        id: 1012,
        workoutDetailsId: 1005,
        setNr: 2,
        repetitions: 10,
        weightKG: 20,
      },
      {
        // Set 1 of Exercise 2 from Workout 3
        id: 1013,
        workoutDetailsId: 1006,
        setNr: 1,
        repetitions: 12,
        weightKG: 12,
      },
      {
        // Set 2 of Exercise 2 from Workout 3
        id: 1014,
        workoutDetailsId: 1006,
        setNr: 2,
        repetitions: 8,
        weightKG: 15,
      },
      {
        // Set 1 of Exercise 3 from Workout 3
        id: 1015,
        workoutDetailsId: 1007,
        setNr: 1,
        repetitions: 6,
        weightKG: 16,
      },
      {
        // Set 2 of Exercise 3 from Workout 3
        id: 1016,
        workoutDetailsId: 1007,
        setNr: 2,
        repetitions: 10,
        weightKG: 18,
      },
      {
        // Set 3 of Exercise 3 from Workout 3
        id: 1017,
        workoutDetailsId: 1007,
        setNr: 3,
        repetitions: 6,
        weightKG: 17,
      },
      {
        // Set 1 of Exercise 1 from Workout 4
        id: 1018,
        workoutDetailsId: 1008,
        setNr: 1,
        repetitions: 10,
        weightKG: 25,
      },
      {
        // Set 2 of Exercise 1 from Workout 4
        id: 1019,
        workoutDetailsId: 1008,
        setNr: 2,
        repetitions: 8,
        weightKG: 30,
      },
      {
        // Set 1 of Exercise 2 from Workout 4
        id: 1020,
        workoutDetailsId: 1009,
        setNr: 1,
        repetitions: 12,
        weightKG: 15,
      },
      {
        // Set 2 of Exercise 2 from Workout 4
        id: 1021,
        workoutDetailsId: 1009,
        setNr: 2,
        repetitions: 10,
        weightKG: 18,
      },
      {
        // Set 1 of Exercise 3 from Workout 4
        id: 1022,
        workoutDetailsId: 1010,
        setNr: 1,
        repetitions: 8,
        weightKG: 20,
      },
      {
        // Set 2 of Exercise 3 from Workout 4
        id: 1023,
        workoutDetailsId: 1010,
        setNr: 2,
        repetitions: 10,
        weightKG: 22,
      },
      {
        // Set 3 of Exercise 3 from Workout 4
        id: 1024,
        workoutDetailsId: 1010,
        setNr: 3,
        repetitions: 6,
        weightKG: 25,
      },
      {
        // Set 1 of Exercise 1 from Workout 5
        id: 1025,
        workoutDetailsId: 1011,
        setNr: 1,
        repetitions: 12,
        weightKG: 22,
      },
      {
        // Set 2 of Exercise 1 from Workout 5
        id: 1026,
        workoutDetailsId: 1011,
        setNr: 2,
        repetitions: 10,
        weightKG: 25,
      },
      {
        // Set 1 of Exercise 2 from Workout 5
        id: 1027,
        workoutDetailsId: 1012,
        setNr: 1,
        repetitions: 15,
        weightKG: 18,
      },
      {
        // Set 2 of Exercise 2 from Workout 5
        id: 1028,
        workoutDetailsId: 1012,
        setNr: 2,
        repetitions: 12,
        weightKG: 20,
      },
      {
        // Set 1 of Exercise 3 from Workout 5
        id: 1029,
        workoutDetailsId: 1013,
        setNr: 1,
        repetitions: 8,
        weightKG: 15,
      },
      {
        // Set 2 of Exercise 3 from Workout 5
        id: 1030,
        workoutDetailsId: 1013,
        setNr: 2,
        repetitions: 10,
        weightKG: 17,
      },
      {
        // Set 3 of Exercise 3 from Workout 5
        id: 1031,
        workoutDetailsId: 1013,
        setNr: 3,
        repetitions: 6,
        weightKG: 20,
      },
      {
        // Set 1 of Exercise 1 from Workout 6
        id: 1032,
        workoutDetailsId: 1014,
        setNr: 1,
        repetitions: 10,
        weightKG: 28,
      },
      {
        // Set 2 of Exercise 1 from Workout 6
        id: 1033,
        workoutDetailsId: 1014,
        setNr: 2,
        repetitions: 8,
        weightKG: 30,
      },
      {
        // Set 1 of Exercise 2 from Workout 6
        id: 1034,
        workoutDetailsId: 1015,
        setNr: 1,
        repetitions: 12,
        weightKG: 16,
      },
      {
        // Set 2 of Exercise 2 from Workout 6
        id: 1035,
        workoutDetailsId: 1015,
        setNr: 2,
        repetitions: 10,
        weightKG: 18,
      },
      {
        // Set 1 of Exercise 3 from Workout 6
        id: 1036,
        workoutDetailsId: 1016,
        setNr: 1,
        repetitions: 8,
        weightKG: 22,
      },
      {
        // Set 2 of Exercise 3 from Workout 6
        id: 1037,
        workoutDetailsId: 1016,
        setNr: 2,
        repetitions: 10,
        weightKG: 24,
      },
      {
        // Set 3 of Exercise 3 from Workout 6
        id: 1038,
        workoutDetailsId: 1016,
        setNr: 3,
        repetitions: 6,
        weightKG: 26,
      },
      {
        // Set 1 of Exercise 1 from Workout 7
        id: 1039,
        workoutDetailsId: 1017,
        setNr: 1,
        repetitions: 12,
        weightKG: 25,
      },
      {
        // Set 2 of Exercise 1 from Workout 7
        id: 1040,
        workoutDetailsId: 1017,
        setNr: 2,
        repetitions: 10,
        weightKG: 28,
      },
      {
        // Set 1 of Exercise 2 from Workout 7
        id: 1041,
        workoutDetailsId: 1018,
        setNr: 1,
        repetitions: 15,
        weightKG: 20,
      },
      {
        // Set 2 of Exercise 2 from Workout 7
        id: 1042,
        workoutDetailsId: 1018,
        setNr: 2,
        repetitions: 12,
        weightKG: 22,
      },
      {
        // Set 1 of Exercise 3 from Workout 7
        id: 1043,
        workoutDetailsId: 1019,
        setNr: 1,
        repetitions: 8,
        weightKG: 18,
      },
      {
        // Set 2 of Exercise 3 from Workout 7
        id: 1044,
        workoutDetailsId: 1019,
        setNr: 2,
        repetitions: 10,
        weightKG: 20,
      },
      {
        // Set 3 of Exercise 3 from Workout 7
        id: 1045,
        workoutDetailsId: 1019,
        setNr: 3,
        repetitions: 6,
        weightKG: 22,
      },
      {
        // Set 1 of Exercise 1 from Workout 8
        id: 1046,
        workoutDetailsId: 1020,
        setNr: 1,
        repetitions: 10,
        weightKG: 28,
      },
      {
        // Set 2 of Exercise 1 from Workout 8
        id: 1047,
        workoutDetailsId: 1020,
        setNr: 2,
        repetitions: 8,
        weightKG: 30,
      },
      {
        // Set 1 of Exercise 2 from Workout 8
        id: 1048,
        workoutDetailsId: 1021,
        setNr: 1,
        repetitions: 12,
        weightKG: 16,
      },
      {
        // Set 2 of Exercise 2 from Workout 8
        id: 1049,
        workoutDetailsId: 1021,
        setNr: 2,
        repetitions: 10,
        weightKG: 18,
      },
      {
        // Set 1 of Exercise 3 from Workout 8
        id: 1050,
        workoutDetailsId: 1022,
        setNr: 1,
        repetitions: 8,
        weightKG: 22,
      },
      {
        // Set 2 of Exercise 3 from Workout 8
        id: 1051,
        workoutDetailsId: 1022,
        setNr: 2,
        repetitions: 10,
        weightKG: 24,
      },
      {
        // Set 3 of Exercise 3 from Workout 8
        id: 1052,
        workoutDetailsId: 1022,
        setNr: 3,
        repetitions: 6,
        weightKG: 26,
      },
      {
        // Set 1 of Exercise 1 from Workout 9
        id: 1053,
        workoutDetailsId: 1023,
        setNr: 1,
        repetitions: 12,
        weightKG: 25,
      },
      {
        // Set 2 of Exercise 1 from Workout 9
        id: 1054,
        workoutDetailsId: 1023,
        setNr: 2,
        repetitions: 10,
        weightKG: 28,
      },
      {
        // Set 1 of Exercise 2 from Workout 9
        id: 1055,
        workoutDetailsId: 1024,
        setNr: 1,
        repetitions: 15,
        weightKG: 20,
      },
      {
        // Set 2 of Exercise 2 from Workout 9
        id: 1056,
        workoutDetailsId: 1024,
        setNr: 2,
        repetitions: 12,
        weightKG: 22,
      },
      {
        // Set 1 of Exercise 3 from Workout 9
        id: 1057,
        workoutDetailsId: 1025,
        setNr: 1,
        repetitions: 8,
        weightKG: 18,
      },
      {
        // Set 2 of Exercise 3 from Workout 9
        id: 1058,
        workoutDetailsId: 1025,
        setNr: 2,
        repetitions: 10,
        weightKG: 20,
      },
      {
        // Set 3 of Exercise 3 from Workout 9
        id: 1059,
        workoutDetailsId: 1025,
        setNr: 3,
        repetitions: 6,
        weightKG: 22,
      },
      {
        // Set 1 of Exercise 1 from Workout 10
        id: 1060,
        workoutDetailsId: 1026,
        setNr: 1,
        repetitions: 12,
        weightKG: 25,
      },
      {
        // Set 2 of Exercise 1 from Workout 10
        id: 1061,
        workoutDetailsId: 1026,
        setNr: 2,
        repetitions: 10,
        weightKG: 28,
      },
      {
        // Set 1 of Exercise 2 from Workout 10
        id: 1062,
        workoutDetailsId: 1027,
        setNr: 1,
        repetitions: 15,
        weightKG: 20,
      },
      {
        // Set 2 of Exercise 2 from Workout 10
        id: 1063,
        workoutDetailsId: 1027,
        setNr: 2,
        repetitions: 12,
        weightKG: 22,
      },
      {
        // Set 1 of Exercise 3 from Workout 10
        id: 1064,
        workoutDetailsId: 1028,
        setNr: 1,
        repetitions: 8,
        weightKG: 18,
      },
      {
        // Set 2 of Exercise 3 from Workout 10
        id: 1065,
        workoutDetailsId: 1028,
        setNr: 2,
        repetitions: 10,
        weightKG: 20,
      },
      {
        // Set 3 of Exercise 3 from Workout 10
        id: 1066,
        workoutDetailsId: 1028,
        setNr: 3,
        repetitions: 6,
        weightKG: 22,
      },
      {
        // Set 1 of Exercise 1 from Workout 11
        id: 1067,
        workoutDetailsId: 1029,
        setNr: 1,
        repetitions: 12,
        weightKG: 25,
      },
      {
        // Set 2 of Exercise 1 from Workout 11
        id: 1068,
        workoutDetailsId: 1029,
        setNr: 2,
        repetitions: 10,
        weightKG: 28,
      },
      {
        // Set 1 of Exercise 2 from Workout 11
        id: 1069,
        workoutDetailsId: 1030,
        setNr: 1,
        repetitions: 15,
        weightKG: 20,
      },
      {
        // Set 2 of Exercise 2 from Workout 11
        id: 1070,
        workoutDetailsId: 1030,
        setNr: 2,
        repetitions: 12,
        weightKG: 22,
      },
      {
        // Set 3 of Exercise 2 from Workout 11
        id: 1071,
        workoutDetailsId: 1030,
        setNr: 3,
        repetitions: 10,
        weightKG: 27,
      },
      {
        // Set 1 of Exercise 1 from Workout 12
        id: 1072,
        workoutDetailsId: 1031,
        setNr: 1,
        repetitions: 12,
        weightKG: 25,
      },
      {
        // Set 2 of Exercise 1 from Workout 12
        id: 1073,
        workoutDetailsId: 1031,
        setNr: 2,
        repetitions: 10,
        weightKG: 28,
      },
      {
        // Set 1 of Exercise 2 from Workout 12
        id: 1074,
        workoutDetailsId: 1032,
        setNr: 1,
        repetitions: 15,
        weightKG: 20,
      },
      {
        // Set 2 of Exercise 2 from Workout 12
        id: 1075,
        workoutDetailsId: 1032,
        setNr: 2,
        repetitions: 12,
        weightKG: 22,
      },
      {
        // Set 1 of Exercise 3 from Workout 12
        id: 1076,
        workoutDetailsId: 1033,
        setNr: 1,
        repetitions: 8,
        weightKG: 18,
      },
      {
        // Set 2 of Exercise 3 from Workout 12
        id: 1077,
        workoutDetailsId: 1033,
        setNr: 2,
        repetitions: 10,
        weightKG: 20,
      },
      {
        // Set 3 of Exercise 3 from Workout 12
        id: 1078,
        workoutDetailsId: 1033,
        setNr: 3,
        repetitions: 6,
        weightKG: 22,
      },
    ]
  });

  await prisma.workoutComment.createMany({
    data: [{
      message: "Leuke workout!",
      profileId: 1,
      workoutId: 1000,
    },
    {
      message: "Leuke workout!",
      profileId: 2,
      workoutId: 1001,
    },
    {
      message: "Leuke workout!",
      profileId: 3,
      workoutId: 1002,
    },
    {
      message: "Leuke workout!",
      profileId: 4,
      workoutId: 1003,
    }
    ]
  });
};

main()
  .then(async () => {
    await prisma.$disconnect().then(() => console.log("Disconnected"));
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect().then(() => console.log("Error occured: Disconnected"));
    process.exit(1);
  });