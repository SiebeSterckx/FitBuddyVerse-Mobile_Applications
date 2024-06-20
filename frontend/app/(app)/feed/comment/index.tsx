import { TWorkoutComment } from "@/types/comment.type";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import workoutService from "@/lib/workoutService";
import { Ionicons } from "@expo/vector-icons";
import utils from "@/lib/utils";

export default function CommentPage({ 
    route,
    navigation,
}: {
    route: RouteProp<any>;
    navigation: NavigationProp<any>;
}) {
    const workout = route.params?.workout;
    const workoutId = workout.id;
    const profile = route.params?.profile;
    const [comments, setComments] = useState<TWorkoutComment[]>([]);
    const [newComment, setNewComment] = useState<string>('');

    const fetchData = async () => {
        try {
            var res = await workoutService.getWorkoutCommentsById(workoutId);
            setComments(res);
        } catch (err) {
            console.log(err);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchData();
    }, []));

    const handleCommentSubmit = () => {
        workoutService.placeComment(workoutId, profile.id, newComment).then((res) => {
            setComments([...comments, res.workoutComment]);
        }).catch((err) => {
            console.log(err);
        });
        setNewComment('');
    };

    return (
        <>
            <View className="bg-white p-6 h-full w-full">
                <Text className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl py-2">{workout.name}</Text>
                
                <FlatList
                    data={comments}
                    renderItem={({ item }) => (
                        <View className="my-1">
                            <View className="py-2 flex flex-row justify-between border-2 border-gray-500 rounded-t-lg bg-gray-800">
                                <Text className="px-1 text-left text-white font-bold text-lg">{item.profile.username}</Text>
                                <Text className="px-1 text-right text-white text-sm">{utils.formatDate(item.createdAt)}</Text>
                            </View>
                            <View className="border-b-2 border-x-2 border-gray-500 rounded-b-lg">
                            <Text className="px-1 py-2">{item.message}</Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
                        
                <View className="flex flex-row jsutify-between border-2 border-gray-200 rounded-lg w-full m-2 my-4">
                    <TextInput className="w-10/12 p-2 bg-gray-100 py-4"
                        value={newComment}
                        onChangeText={setNewComment}
                        placeholder="Write a comment..."
                    />

                    <TouchableOpacity className="w-2/12 border-2 border-gray-200 rounded-lg bg-gray-800 justify-center" onPress={handleCommentSubmit}>
                        <Text className="text-center">
                            <Ionicons className="" name="send-sharp" size={24} color={"white"}/>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}