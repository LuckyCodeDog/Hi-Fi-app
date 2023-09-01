
// MainScreen.js
import React,{useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const MainScreen = ({ navigation }) => {


  return (
    <View>
      <Text>{wifi}</Text>
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default MainScreen;