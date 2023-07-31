import React from 'react';
import { View, Text,Button,Navigator } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './navigators/MainStackNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const App = () => {
    return (
        <NavigationContainer>
            <MainStackNavigator/>
        </NavigationContainer>
      
    );
};

export default App;
