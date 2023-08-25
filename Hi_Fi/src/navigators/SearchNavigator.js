import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FindWifiScreen from '../screens/FindWifiScreen';
import SearchScreen from '../screens/SearchScreen';
const Stack = createStackNavigator();


const SearchNavigator = ()=>{
    return( <Stack.Navigator>
        <Stack.Screen name='findWifi' component={FindWifiScreen} options={{headerShown:false}}></Stack.Screen>
        <Stack.Screen name='SearchScreen' component={SearchScreen} options={{ headerShown: false }}></Stack.Screen>
    </Stack.Navigator>
    )
}

export default SearchNavigator;