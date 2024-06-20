import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ErrorProps {
	errors: string[];
	clear: () => void;
}

const Alert = ({ errors, clear }: ErrorProps) => {
	return (
		<View className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
			<Text className="font-bold">Oops!</Text>
			<Text className="block sm:inline sm:ml-2">
				{errors.map((error, index) => (
					<Text key={index}>{error}</Text>
				))}
			</Text>
			<TouchableOpacity
				onPress={clear}
				className="absolute top-0 bottom-0 right-0 px-4 py-3"
			>
				<View>
					<Text className="h-6 w-6 text-red-500">
						X
						{/* Your close icon (you may need to use a different approach for the icon) */}
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Alert;
