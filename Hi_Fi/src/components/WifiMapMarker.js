import React,{useEffect} from 'react'
import {Marker} from 'react-native-maps'
import {View,StyleSheet,Animated} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const WifiMapMarker =(props) =>{
  useEffect(()=>{
    // console.log(props.id)
    // console.log(props.coordinate)
  })
  return (
    <Marker  identifier ={props.id.toString()} coordinate={props.coordinate} onPress={props.onPressMarker}>
      <Animated.View  style={[styles.view,{backgroundColor:props.color}]}  > 
        <Icon name='wifi' size={25} color={"white"} style={styles.icon} ></Icon>
      </Animated.View>
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
      borderRadius:50,
      alignContent:"center",
      justifyContent:'center'
    }
})
export default WifiMapMarker
