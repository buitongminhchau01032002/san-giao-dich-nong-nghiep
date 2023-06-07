import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import NAVIGATION_KEY from '../constants/NavigationKey';
import SignupScreen from '../screens/SignupScreen/Signup';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
                name={NAVIGATION_KEY.Login}
                component={LoginScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
                name={NAVIGATION_KEY.Signup}
                component={SignupScreen}
            />
        </Stack.Navigator>
    );
}
