import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import BottomTabNavigator from './BottomTabNavigator';
import SearchScreen from '../screens/SearchScreen';



const Stack = createStackNavigator();
const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} >
        <Stack.Screen name='SearchScreen' component={SearchScreen} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Screen>
      <Stack.Screen name='Main' component={BottomTabNavigator} options={{ headerShown: false }} ></Stack.Screen>

    </Stack.Navigator>
  );
};

export default MainStackNavigator;
