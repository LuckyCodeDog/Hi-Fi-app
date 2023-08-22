// LoginScreen.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image,StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('/Users/alexliu/Desktop/Apllied computing/nomadnodes-app/Hi-Fi-app/Hi_Fi/src/components/logo.png')} style={styles.logo} />
      <Text style={styles.header}>Welcome to Nomadnodes</Text>

      <TextInput
        style={styles.input}
        placeholder="Username/Email"
        // Add onChangeText and value props to handle input changes
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        // Add onChangeText and value props to handle input changes
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%', // Adjust this value to control the width of the buttons and their spacing
    marginBottom: 15, // Add some spacing below the button container
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: 'center',
    flex: 1, // Allow the button to take equal space within the container
  },
  skipButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: 'center',
    flex: 1, // Allow the button to take equal space within the container
    marginLeft: 10, // Add some spacing between the buttons
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  forgotPassword: {
    color: 'blue',
    fontSize: 14,
  },
  logo: {
    width: 340, 
    height: 150, 
  },
});

export default LoginScreen;

export default LoginScreen;