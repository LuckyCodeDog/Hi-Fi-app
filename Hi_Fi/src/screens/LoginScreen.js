// LoginScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Login Screen</Text>
      <Text style={style.header}>This is login page </Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  );
};

const  style = StyleSheet.create({
    header:{
        fontSize: 30,
        textAlign: 'center'
    }
})
export default LoginScreen;