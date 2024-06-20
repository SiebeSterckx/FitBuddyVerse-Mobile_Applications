import exerciseService from "@/lib/exerciseService";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View, ScrollView, Image } from "react-native";
import { LineChart } from "react-native-chart-kit";

//Workout Graph
interface ApiResponseGraph {
  status: string;
  graph: GraphItem[];
}
interface GraphItem {
  id: number;
  volumeKG: number;
  createdAt: string;
  one_rep_max: number;
  max_weight: number;
  total_reps: number;
  best_set_volume: number;
}
type GraphItemFilterType = "volumeKG" | "one_rep_max" | "max_weight" | "total_reps" | "best_set_volume";

const changeToUserView = {
  volumeKG: "Volume (kg)",
  one_rep_max: "One Rep Max (kg)",
  max_weight: "Max Weight (kg)",
  total_reps: "Total Reps (amount)",
  best_set_volume: "Best Set Volume (kg)",
};

//Personal Best
interface ApiResponseBest {
  status: string;
  personal_best: BestItem[];
}
interface BestItem {
  best_one_rep_max: number;
  heaviest_weight: number;
  best_set_volume: number;
  best_reps: number;
  set_volume_string: string;
}

export default function ExerciseInfoPage({ route, navigation }: { route: any; navigation: NavigationProp<any> }) {
  const { id, userid, exercise } = route.params;

  const [exerciseGraph, setExerciseGraph] = useState<ApiResponseGraph>();
  const [userSelected, setUserSelected] = useState<GraphItemFilterType>("volumeKG"); // volumeKG is default value
  const [exerciseBest, setExerciseBest] = useState<ApiResponseBest>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Personal Records
        const exerciseBest: ApiResponseBest = await exerciseService.getExerciseBest(id, userid);
        setExerciseBest(exerciseBest);

        //Graphs Data
        const exerciseGraph: ApiResponseGraph = await exerciseService.getExerciseGraph(id, userid);
        setExerciseGraph(exerciseGraph);

        navigation.setOptions({
          title: exercise.name + " Info",
        });
      } catch (error) {
        console.error("Error fetching", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView className="bg-white h-screen">
      {/* INFO VIEW */}
      <View className="px-4 pt-3">
        <Text className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{exercise.name} <Text className="text-xl">({exercise.equipment})</Text></Text>
        <Text>Primary: {exercise.type}</Text>

        <View className="mt-3 pb-3 border-b-2 border-gray-200">
          <Text className="p-2 text-lg font-bold border-2 rounded-t-lg border-gray-500 bg-gray-800 text-white"><Ionicons name="barbell-outline" size={18} color={"white"} /> How To</Text>
          <Text className="p-2 text-base border-x-2 border-b-2 rounded-b-lg border-gray-500 bg-gray-100">{exercise.description}</Text>
        </View>
      </View>

      <View className="px-4 py-3">
        <View className="border-b-2 border-gray-200 pb-3">
          {/* Go to exercise history button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("ExerciseHistory", { id: id, userid: userid, name: exercise.name })}
            className="bg-gray-800 rounded py-2">
            <Text className="text-center text-white font-bold text-lg">Go to Exercise History</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-4 mb-10">
        {/* GRAPH VIEW */}
        {/* Verify if there is data available to display in the graph. */}
        {exerciseGraph && exerciseGraph.graph.length > 0 ? (
          <>
            <Text className="font-bold text-lg">{changeToUserView[userSelected]}</Text>
            <LineChart
              data={{
                labels: exerciseGraph?.graph.map(
                  // Take only date out of createdAt, example original form:"2023-12-28T11:39:11.025Z"

                  (item) => item.createdAt.split("T")[0]
                ) ?? ["error"],
                datasets: [
                  {
                    data: exerciseGraph?.graph.map((item) => item[userSelected]) ?? [0],
                  },
                ],
              }}
              width={(Dimensions.get("window").width / 100) * 92} // from react-native
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#1F2937",
                backgroundGradientFrom: "#1F2937",
                backgroundGradientTo: "#1F2937",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#1F2937",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 0,
              }}
            />
            <ScrollView horizontal style={{ maxHeight: 30 }}>
              <View style={{ flexDirection: "row" }}>
                {/* Filter buttons */}
                <TouchableOpacity
                  onPress={() => setUserSelected(userSelected === "volumeKG" ? "volumeKG" : "volumeKG")}
                  className="bg-gray-800 rounded mr-1 px-2 py-1">
                  <Text className="text-center text-white font-bold">Volume</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setUserSelected(userSelected === "one_rep_max" ? "volumeKG" : "one_rep_max")}
                  className="bg-gray-800 rounded mr-1 px-2 py-1">
                  <Text className="text-center text-white font-bold">One Rep Max</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setUserSelected(userSelected === "max_weight" ? "volumeKG" : "max_weight")}
                  className="bg-gray-800 rounded mr-1 px-2 py-1">
                  <Text className="text-center text-white font-bold">Max Weight</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setUserSelected(userSelected === "total_reps" ? "volumeKG" : "total_reps")}
                  className="bg-gray-800 rounded mr-1 px-2 py-1">
                  <Text className="text-center text-white font-bold">Total Reps</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setUserSelected(userSelected === "best_set_volume" ? "volumeKG" : "best_set_volume")}
                  className="bg-gray-800 rounded mr-1 px-2 py-1">
                  <Text className="text-center text-white font-bold">Best Set Volume</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </>
        ) : (
          // Shown when there is no available graph data
          <View className="bg-slate-400/20 p-4 rounded-md items-center">
            <Image source={require("../../assets/bar-graph.png")} className="h-20 w-20" />
            <Text className="text-center font-bold text-lg">No graph data yet</Text>
          </View>
        )}

        {/* BEST VIEW */}
        {/* Verify if there is data available to display in the records section. */}
        {exerciseBest && exerciseBest.personal_best[0].heaviest_weight !== null ? (
          <View className="py-4">
            <Text className="font-bold text-xl">Personal Records🥇</Text>
            <View>
              <Text className="border-b-2 py-3 border-gray-200 font-bold">Heaviest Weight: {exerciseBest.personal_best[0].heaviest_weight} kg</Text>
              <Text className="border-b-2 py-3 border-gray-200 font-bold">Best 1RM: {exerciseBest.personal_best[0].best_one_rep_max} kg</Text>
              <Text className="border-b-2 py-3 border-gray-200 font-bold">Best Reps Amount: {exerciseBest.personal_best[0].best_reps} reps</Text>
              <Text className="border-b-2 py-3 border-gray-200 font-bold">
                Best Set Volume: {exerciseBest.personal_best[0].best_set_volume} kg ({exerciseBest.personal_best[0].set_volume_string})
              </Text>
            </View>
          </View>
        ) : (
          // Shown when there is no available best data
          <View className="bg-slate-400/20 p-4 rounded-md items-center mt-2">
            <Text className="text-center font-bold text-lg">No personal records yet</Text>
          </View>
        )}

      </View>
    </ScrollView>
  );
}
