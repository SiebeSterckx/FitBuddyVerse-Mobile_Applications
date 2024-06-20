import { TWorkoutDetails } from '@/types/details.type';
import { TExerciseSet } from '@/types/set.type';
import { TWorkoutExercise } from '@/types/workout.type';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import React, { FC } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';


interface Props {
  workout: TWorkoutExercise;
  setWorkout: any;
  navigation: NavigationProp<any>;
}

const Exercise: FC<Props> = ({ workout, setWorkout, navigation }: Props) => {

  function ChangeInputHandler(setNr: number, exerciseId: number, target: string, type: string): void {
    var number = Number(target);
    if (isNaN(number)) {
      return;
    }
    const newTableData = { ...workout };
    const exercise = newTableData.workoutDetails?.find((exercise) => exercise.exerciseId === exerciseId);
    if (exercise) {
      const set = exercise.exerciseSets?.find((set) => set.setNr === setNr);
      if (set) {
        if (type === 'weightKG') {
          set.weightKG = number;
        } else if (type === 'repetitions') {
          set.repetitions = number;
        }
        if (set.isCompleted) newTableData.volumeKG = calculateVolume(); // Recalculate volume
      }
    }
    setWorkout(newTableData);
  }

  function addSetHandler(exerciseId: number) {
    const newTableData = { ...workout };
    const exercise = newTableData.workoutDetails?.find((exercise) => exercise.exerciseId === exerciseId);
    if (exercise) {
      var newSetNr = exercise.exerciseSets?.length ? exercise.exerciseSets.length + 1 : 1
      const newSet = {
        exerciseId: exerciseId,
        setNr: newSetNr,
        repetitions: 0,
        weightKG: 0
      };
      exercise.exerciseSets?.push(newSet);
    }
    setWorkout(newTableData);
  }

  function deleteSetHandler(setNr: number, exerciseId: number): void {
    const newTableData = { ...workout };
    const exercise = newTableData.workoutDetails?.find((exercise) => exercise.exerciseId === exerciseId);
    if (exercise) {
      const newExerciseSets = exercise.exerciseSets?.filter((set) => set.setNr !== setNr);
      exercise.exerciseSets = newExerciseSets;
      if (!newExerciseSets?.length) {
        newTableData.workoutDetails = newTableData.workoutDetails?.filter((exercise) => exercise.exerciseId !== exerciseId);
      }
      //Reassign set numbers
      if (newExerciseSets?.length) {
        newExerciseSets.forEach((set, index) => {
          set.setNr = index + 1;
        });
      }
      newTableData.volumeKG = calculateVolume(); // Recalculate volume
    }
    setWorkout(newTableData);
  }

  function ChangeVolumeHandler(setNr: number, exerciseId: number, value: boolean): void {
    setWorkout((prevWorkout: any) => {
      const updatedWorkout = { ...prevWorkout };
      const exercise = updatedWorkout.workoutDetails?.find((exercise: { exerciseId: number; }) => exercise.exerciseId === exerciseId);

      if (exercise) {
        const set = exercise.exerciseSets?.find((set: { setNr: number; }) => set.setNr === setNr);

        if (set) {
          set.isCompleted = value;
        }
      }

      return { ...updatedWorkout, volumeKG: calculateVolume() };
    });
  }

  function calculateVolume(): number {
    var volume = 0;
    workout.workoutDetails?.forEach((exercise) => {
      exercise.exerciseSets?.forEach((set) => {
        if (set.isCompleted) {
          volume += set.weightKG * set.repetitions;
        }
      });
    });
    return volume;
  }

  function addExerciseNote(exerciseId: number, note: string): void {
    const newTableData = { ...workout };
    const exercise = newTableData.workoutDetails?.find((exercise) => exercise.exerciseId === exerciseId);
    if (exercise) {
      exercise.note = note;
    }
    setWorkout(newTableData);
  }

  return (
    <View className='mt-2'>
      {workout.workoutDetails ? (
        workout.workoutDetails.map((row: TWorkoutDetails) => (
          <View key={row.exercise?.name}>
            {/* ExerciseInfoPage receives exercise-id and userid */}
            <TouchableOpacity onPress={() => navigation.navigate('ExerciseInfo', { id: row.exerciseId, userid: workout.profileId, exercise: row.exercise })}>
              <Text className='font-bold text-2xl'>{row.exercise?.name}</Text>
            </TouchableOpacity>
            <TextInput placeholder='Add Exercise Note...' onChangeText={text => addExerciseNote(row.exerciseId, text)}></TextInput>
            <View className='flex-row justify-between'>
              <Text className='font-bold text-lg'>{row.exercise?.type}</Text>
              <Text className='font-bold text-lg'>{row.exercise?.equipment}</Text>
            </View>

            {/*Table*/}
            <View>
              <View className='flex-row bg-gray-200 py-2 justify-around'>
                <Text className='text-lg'>Set</Text>
                <Text className='text-lg'>KG</Text>
                <Text className='text-lg'>Reps</Text>
                <Text className='text-lg'>Check</Text>
                <Text className='text-lg'>Delete</Text>
              </View>
              {row.exerciseSets ? (
                row.exerciseSets.map((r: TExerciseSet) => (
                  <View key={r.setNr} className={`flex-row justify-around border-b border-gray-300 py-2 ${r.isCompleted ? 'bg-green-300' : ''}`}>
                    <Text className='text-lg'>{r.setNr}</Text>
                    <TextInput className='text-lg' onChangeText={text => ChangeInputHandler(r.setNr, row.exerciseId, text, 'weightKG')} placeholder='0' keyboardType="numeric" />
                    <TextInput className='text-lg' onChangeText={text => ChangeInputHandler(r.setNr, row.exerciseId, text, 'repetitions')} placeholder='0' keyboardType="numeric" />
                    <TouchableOpacity onPress={() => ChangeVolumeHandler(r.setNr, row.exerciseId, !r.isCompleted ?? false)}>
                      <View>
                        <Text className='text-lg'>{r.isCompleted ? '✓' : 'X'}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteSetHandler(r.setNr, row.exerciseId)}>
                      <View>
                        <Ionicons name="trash-outline" size={24} color="black" />
                      </View>
                    </TouchableOpacity>
                  </View>
                ))
              ) : null}
            </View>
            <TouchableOpacity onPress={() => addSetHandler(row.exerciseId)} className='bg-gray-700 rounded mt-4 py-2'>
              <Text className='text-white text-center text-lg'>+ Add Set</Text>
            </TouchableOpacity>
            <View className='my-2 border' />
          </View>
        ))
      ) : null}
    </View>
  );
};

export default Exercise;