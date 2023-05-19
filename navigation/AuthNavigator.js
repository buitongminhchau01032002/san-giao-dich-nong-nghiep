import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import NAVIGATION_KEY from '../constants/NavigationKey';


const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={NAVIGATION_KEY.Login} component={LoginScreen} />
        </Stack.Navigator>
    );
}
