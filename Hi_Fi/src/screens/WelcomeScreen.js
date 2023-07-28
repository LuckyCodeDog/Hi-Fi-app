import React,{useEffect} from 'react'
import { View,Text,StyleSheet } from 'react-native'

function WelcomeScreen({navigation}) {
  useEffect(
    ()=>{
        setTimeout(
           ()=>{ navigation.navigate('Login')}, 2000
        )
    },[]
  );

  return (
        <View style={styles.container} >
            <Text style={styles.title}>
                Welcome to Hi-Fi!
            </Text>
        </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

export default WelcomeScreen
