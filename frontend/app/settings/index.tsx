import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import profileService from "@/lib/profileService";
import { NavigationProp } from "@react-navigation/native";
import Toast from "react-native-root-toast";


export default function SettingsPage({ navigation }: { navigation: NavigationProp<any> }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveChanges = async () => {
        const id = JSON.parse((await AsyncStorage.getItem("profile")) ?? "{}").id;
        setIsLoading(true);

        const profile = await AsyncStorage.getItem("profile");
        if (profile) {
            const parsedProfile = JSON.parse(profile);
            const updatedProfile = {
                ...parsedProfile,
                username: username || parsedProfile.username,
                email: email || parsedProfile.email,
            };

            if (currentPassword && newPassword) {
                updatedProfile.password = newPassword;
            } else if (!currentPassword && newPassword) {
                Toast.show('Please provide the current password.', {
                    duration: Toast.durations.LONG,
                  });
            } else if (currentPassword && !newPassword) {
                Toast.show('Please provide the new password.', {
                    duration: Toast.durations.LONG,
                  });
            }

            await profileService.updateProfile(id, updatedProfile.username, updatedProfile.email, updatedProfile.password);

            await AsyncStorage.setItem("profile", JSON.stringify(updatedProfile));
        }

        setIsLoading(false);
        
        Toast.show('Changes saved successfully!', {
            duration: Toast.durations.LONG,
          });
        navigation.navigate('Profile');   
    };

    const handleLogout = () => {
        AsyncStorage.removeItem("profile");
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity className="py-2 px-4 bg-blue-400 rounded" onPress={() => handleLogout()}>
                    <Text className="text-center font-bold">Logout</Text>
                </TouchableOpacity>
            )
        });
    },[]);
    
    return (
        <View className="bg-white flex-1 justify-center p-4">
            <Text className="text-center text-2xl font-bold mb-4">Settings</Text>

            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            />

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            />

            <TextInput
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={(text) => setCurrentPassword(text)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            />

            <TextInput
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                className="border border-gray-300 rounded-md px-4 py-2 mb-4"
            />

            <TouchableOpacity onPress={handleSaveChanges}>
                <View className="bg-gray-800 rounded py-3 items-center">
                    {!isLoading ? (
                        <Text className="text-white text-lg">Save Changes</Text>
                    ) : (
                        <ActivityIndicator color="white" />
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
}
