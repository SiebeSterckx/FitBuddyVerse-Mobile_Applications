import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import profileService from "@/lib/profileService";
import { TProfile } from "@/types/profile.type";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, RouteProp } from "@react-navigation/native";

export default function FollowPage({
    route,
    navigation,
}: {
    route: RouteProp<any>;
    navigation: NavigationProp<any>;
}) {
    const type = route.params?.type;
    const profileId = route.params?.profileId;
    const [profiles, setProfiles] = useState<TProfile[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await profileService.getFollow(profileId);
                
                let newProfiles = [];
                
                if (type === "followers") {
                    newProfiles = res.profile.followedBy || [];
                } else {
                    newProfiles = res.profile.following || [];
                }

                setProfiles(newProfiles);
                
            } catch (err) {
                console.log(err);
            }
        };

        navigation.setOptions({
            title: type === "followers" ? "Followers" : "Following",
        });
        fetchData();
    }, [type, profileId]);

    return (
        <View className="items-center bg-white p-6 h-full">
            <View className="w-full pb-2">
                {type === "followers" ? (
                    <Text className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Followers</Text>
                ) : (
                    <Text className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Following</Text>
                )}
            </View>
            {profiles.map((profile) => (
                <View className="w-full border-b-2 py-4 border-gray-300" key={profile.id}>
                    <TouchableOpacity className="flex-row justify-between"
                    onPress={() => navigation.navigate("ProfileUser", { id: profile.id })}>
                        <Text className="text-lg font-bold">{profile.username}</Text>
                        <Ionicons name="chevron-forward-outline" size={24} color={"black"}/>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}
