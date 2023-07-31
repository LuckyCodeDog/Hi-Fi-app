import React from 'react'
import {Marker} from 'react-native-maps'
import {View,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const WifiMapMarker =(props) =>{
  return (
    <Marker coordinate={props.coordinate}>
      <View style={styles.view} > 
      <Icon name='wifi' size={25} color={"white"} style={styles.icon} ></Icon>
      </View>
    </Marker>
  )
}
const styles = StyleSheet.create({
    icon:{
      position:'absolute',
      left:5.5,
    },
    view:{
      width:40,
      height:40,
      backgroundColor:"blue",
      borderRadius:50,
      alignContent:"center",
      justifyContent:'center'
    }
})
export default WifiMapMarker
