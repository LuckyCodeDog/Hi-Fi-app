import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FindWifiScreen from '../screens/FindWifiScreen'
import MyNodesScreen from '../screens/MyNodesScreen'
import RewardsScreen from '../screens/RewardsScreen'
import WalletScreen from '../screens/WalletScreen'
import SettingScreen from '../screens/SettingScreen'
import SearchNavigator from './SearchNavigator'
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from 'react-native'



const Tab = createBottomTabNavigator()

function BottomTabNavigator() {

    const tabs = [
        {name:'Find Wifi', component : SearchNavigator,icon: 'wifi'},
        {name: 'My Nodes', component:MyNodesScreen, icon:"globe"},
        {name:'Rewards', component:RewardsScreen, icon:'star'},
        {name:'Wallet', component:WalletScreen,icon:'credit-card'},
        {name:"Setting" ,component:SettingScreen,icon:"gear"}
    ]


  return (
    <Tab.Navigator>
        {tabs.map((tab, index) => (
          <Tab.Screen
            key={index}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Icon name={tab.icon} size={size} color={color} />
              ),
              headerShown:false,
            }}
          />
        ))}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
    BottomBar:{
        fontSize: 15
    }
})

export default BottomTabNavigator
