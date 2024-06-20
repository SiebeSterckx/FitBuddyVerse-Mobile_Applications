import Exercise from "@/components/exercise/Exercise";
import exerciseService from "@/lib/exerciseService";
import workoutService from "@/lib/workoutService";
import { TExercise } from "@/types/exercise.type";
import { TWorkoutExercise } from "@/types/workout.type";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Toast from "react-native-root-toast";


export default function WorkoutPage({ navigation }: { navigation: NavigationProp<any> }) {

    const [workout, setWorkout] = useState<TWorkoutExercise>({ name: '', createdAt: '', durationSec: 0, volumeKG: 0, profileId: 0, workoutDetails: [] });
    const [opened, setOpened] = useState(false);
    const [exercises, setExercises] = useState<TExercise[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<TExercise[]>([]);

    useEffect(() => {
        if (workout.completed) {
            //Finish workout
            const completedSets = workout.workoutDetails?.map((exercise) => exercise?.exerciseSets?.filter((set) => set.isCompleted && set.repetitions != 0 && set.weightKG != 0)).flat()

            if (!workout.name.trim()) {
                Toast.show('Please enter a workout name', {
                    duration: Toast.durations.LONG,
                  });
                setWorkout((prevWorkout) => ({ ...prevWorkout, completed: false }))
                return;
            } else if (!workout.workoutDetails?.length) {
                Toast.show('Please add at least 1 exercise', {
                    duration: Toast.durations.LONG,
                  });
                setWorkout((prevWorkout) => ({ ...prevWorkout, completed: false }))
                return;
            } else if (completedSets?.length === 0) {
                Toast.show('Please complete at least 1 set', {
                    duration: Toast.durations.LONG,
                  });
                setWorkout((prevWorkout) => ({ ...prevWorkout, completed: false }))
                return;
            }

            //Remove not completed sets
            workout.workoutDetails?.forEach((exercise) => {
                exercise.exerciseSets = exercise.exerciseSets?.filter((set) => set.repetitions != 0 && set.weightKG != 0 && set.isCompleted);
                if (!exercise.exerciseSets?.length) workout.workoutDetails = workout.workoutDetails?.filter((item) => item.exerciseId !== exercise.exerciseId);
            });

            workoutService.createWorkout(workout).then((res) => {
                navigation.reset({ routes: [{ name: "Profile" }] });
                Toast.show('Workout completed!', {
                    duration: Toast.durations.LONG,
                  });
            }).catch((err) => {
                setWorkout((prevWorkout) => ({ ...prevWorkout, completed: false }))
                console.log(err);
            });
        }
    }, [workout.completed]);

    useEffect(() => {
        (async () => {
            const exercises = await exerciseService.getAllExercises();
            setExercises(exercises);

            AsyncStorage.getItem("profile").then((res) => {
                const profile = JSON.parse(res!);
                workout.profileId = profile.id;
            }).catch((err) => {
                console.log(err);
            });
        })();
    }, []);

    const AddSelectedExerciseHandler = (exercise: TExercise) => {
        if (selectedExercise.includes(exercise)) {
            setSelectedExercise(selectedExercise.filter((item) => item.id !== exercise.id));

        } else setSelectedExercise([...selectedExercise, exercise]);
    };

    const AddExerciseHandler = () => {
        selectedExercise.forEach((exercise) => {
            //Check if exercise already exists
            if (workout.workoutDetails?.find((item) => item.exerciseId === exercise.id)) return;
            const newExercise = {
                exerciseId: exercise.id,
                exercise: { ...exercise },
                exerciseSets: [{ setNr: 1, repetitions: 0, weightKG: 0 }]
            };
            workout.workoutDetails?.push(newExercise);
        });

        //If workout is new, set createdAt when adding first exercise
        if (workout.createdAt === '' && selectedExercise.length !== 0) {
            workout.createdAt = moment().format();

            //Add Cancel & Finish button to header
            navigation.setOptions({
                headerLeft: () => (
                    <TouchableOpacity className="ml-2 p-2 bg-red-400 rounded" onPress={() => navigation.reset({ routes: [{ name: "Feed" }] })}>
                        <Text className="text-center font-bold">Cancel</Text>
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity className="mr-2 p-2 bg-blue-400 rounded" onPress={() => setWorkout((prevWorkout) => ({ ...prevWorkout, completed: true }))}>
                        <Text className="text-center font-bold">Finish</Text>
                    </TouchableOpacity>
                )
            });
        }

        setSelectedExercise([]);
        setOpened(false);
    };

    useEffect(() => {
        if (workout.createdAt) {
            const interval = setInterval(() => {
                setWorkout((prevWorkout) => ({
                    ...prevWorkout,
                    durationSec: prevWorkout.createdAt ? moment().diff(moment(prevWorkout.createdAt), 'seconds') : 0
                }));
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [workout.createdAt]);

    const formatDuration = (durationSec: number) => {
        const duration = moment.duration(durationSec, 'seconds');
        return durationSec < 60 ? `${durationSec} sec` : `${duration.minutes()}m ${duration.seconds()}s`;
    };

    return (
        <ScrollView className="bg-white h-screen">
            <View className="flex-col p-2">
                <Text className="mb-2 font-bold text-2xl">Workout Name</Text>
                <TextInput className="border border-gray-400 rounded p-2 text-base" value={workout.name} onChangeText={(value) => setWorkout({ ...workout, name: value })} placeholder="New Workout" />

                <TouchableOpacity onPress={() => setOpened(true)} className="bg-gray-700 rounded mt-4 py-2">
                    <Text className="text-center text-white font-bold text-lg">+ Add Exercise</Text>
                </TouchableOpacity>
                <View className="flex-row justify-between">
                    <Text className="text-base">Time: {formatDuration(workout.durationSec)}</Text>
                    <Text className="text-base">Total Volume: {workout.volumeKG}</Text>
                </View>
                <Exercise workout={workout} setWorkout={setWorkout} navigation={navigation} />
            </View>

            {/* Modal AddExercise*/}
            <Modal visible={opened} onRequestClose={() => { setOpened(false); setSelectedExercise([]) }} animationType="slide" presentationStyle="pageSheet">
                <View className="flex-col justify-between h-screen">
                    <ScrollView>
                        <TouchableOpacity onPress={() => { setOpened(false); setSelectedExercise([]) }} className="bg-gray-700 py-4">
                            <Text className="text-center text-white font-bold">Cancel</Text>
                        </TouchableOpacity>
                        {exercises.map((exercise) => (
                            <TouchableOpacity key={exercise.id} onPress={() => AddSelectedExerciseHandler(exercise)}>
                                <View className="border-b-2 border-gray-400 p-2">
                                    <View className={`${selectedExercise.includes(exercise) ? 'border-l-4 border-slate-600' : ''}`}>
                                        <Text className="text-black font-bold text-lg ml-2">{exercise.name} ({exercise.equipment})</Text>
                                        <Text className="text-black ml-2">{exercise.type}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    {selectedExercise.length > 0 ? (
                        <TouchableOpacity onPress={() => AddExerciseHandler()} className="bg-gray-700 py-4 absolute inset-x-6 rounded bottom-10">
                            <Text className="text-center text-white font-bold">Add {selectedExercise.length > 1 ? selectedExercise.length + " exercises" : '1 exercise'} </Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </Modal>
        </ScrollView>
    );
}