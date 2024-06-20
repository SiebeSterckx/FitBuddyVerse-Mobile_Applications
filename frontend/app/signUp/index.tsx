import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Errors from "@/components/Errors";
import profileService from '@/lib/profileService';
import { NavigationProp } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

export default function RegistrationForm({navigation}: {navigation: NavigationProp<any>}) {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<any[]>([]);

    const handleRegistration = async () => {
        profileService.createProfile(username, email, password).then((res) => {
            if (res.status === 201) {
                setErrors([]);
                navigation.navigate('Login');
                Toast.show('Profile Created!', {
                    duration: Toast.durations.LONG,
                  });
            } else {
                setErrors(['Error creating profile. Please try again']);
            }
        }).catch((err) => {
            setErrors([err.response.data.errorMessage]);
        });
    };
    return (
        <View className="bg-white justify-center items-center p-2 h-full">
            <View className="space-y-6 w-full">
                <Text className='text-center text-4xl font-bold mb-2'>Registration</Text>
                {errors.length > 0 && (
                    <Errors errors={errors} clear={() => setErrors([])} />
                )}
                <TextInput className="border-b-2 border-gray-500 p-2"
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                />

                <TextInput className="border-b-2 border-gray-500 p-2"
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />

                <TextInput className="border-b-2 border-gray-500 p-2"
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    autoCapitalize="none"
                />
                <TouchableOpacity onPress={handleRegistration}>
                    <View className="bg-gray-800 rounded p-2 items-center">
                        <Text className="text-white text-lg">Register</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
