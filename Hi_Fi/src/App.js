import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

function App() {
  return (
    <View>
        <Text style={style.text}>
            Hi-Fi
            Ready to work!
        </Text>
    </View>
  )
}

const style = StyleSheet.create({
    text:{
        fontSize:25,
        textAlign:'center'
    }
})
export default App
