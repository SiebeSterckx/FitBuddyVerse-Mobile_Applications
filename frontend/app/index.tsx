import Errors from "@/components/Errors";
import React, { useEffect, useState } from "react";
import {ActivityIndicator, Text, TextInput, TouchableOpacity, View, Image} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import profileService from "@/lib/profileService";
import { NavigationProp } from "@react-navigation/native";

export default function LoginPage({navigation}: {navigation: NavigationProp<any>}) {
	const [emailOrUsername, setEmailOrUsername] = useState("");
	const [password, setPassword] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<any[]>([]);

	useEffect(() => {
		AsyncStorage.getItem("profile").then((profile) => {
			if (profile) {
				navigation.reset({
					index: 0,
					routes: [{ name: 'FitBuddyVerse' }],
				});
			}
		});
	}, []);

	const handleSubmit = async () => {
		setIsLoading(true);
		profileService.loginProfile(emailOrUsername, password).then((res) => {
			if (res.status === 200) {
				AsyncStorage.setItem("profile", JSON.stringify(res.data.profile));
				setErrors([]);
				navigation.reset({
					index: 0,
					routes: [{ name: 'FitBuddyVerse' }],
				});
			} else {
				setErrors(['Something went wrong! Please try again']);
			}
		}).catch((err) => {
			setErrors(['Invalid username or password']);
			console.log(err);
		}).finally(() => {
			setPassword("");
			setIsLoading(false);
		});
	};

	return (
		<View className="bg-white justify-between p-2 h-full">
			<View className="mx-auto flex-row items-center mt-16">
				<Image source={require("../assets/Logo.jpeg")} className="h-12 w-12 rounded-full"/>
				<Text className="text-4xl font-bold ml-2">FitBuddyVerse</Text>
			</View>
			<View>
				<Text className="text-center text-2xl font-bold mb-4">
					Sign in to your account
				</Text>
				{errors.length > 0 && (
					<Errors errors={errors} clear={() => setErrors([])} />
				)}

				<View className="mb-4 space-y-2">
					<TextInput
						onChangeText={(text) => setEmailOrUsername(text)}
						placeholder="Email or username"
						className="border-b-2 border-gray-500 p-2 mb-2"
						cursorColor={"#000"}
						value={emailOrUsername}
					/>
					<TextInput
						onChangeText={(text) => setPassword(text)}
						placeholder="Password"
						secureTextEntry
						className="border-b-2 border-gray-500 p-2"
						cursorColor={"#000"}
						autoCapitalize="none"
						value={password}
					/>
				</View>

				<TouchableOpacity onPress={handleSubmit}>
					<View className="bg-gray-800 rounded py-3 items-center">
						{!isLoading ? (
							<Text className="text-white text-lg">Sign in</Text>
						) : (
							<ActivityIndicator color="white" />
						)}
					</View>
				</TouchableOpacity>
			</View>
			<TouchableOpacity onPress={() => navigation.navigate("Register")} className="items-center p-2">
					<Text className="text-gray-500 font-bold text-lg">No account yet? Sign up</Text>
			</TouchableOpacity>
		</View>
	);
}
