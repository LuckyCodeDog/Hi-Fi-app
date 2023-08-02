import React,{useRef} from "react";
import { View, Animated, Text, StyleSheet,TouchableOpacity    } from "react-native";

const AnimationDemo = ()=>{

    const fadeAnim = useRef(new Animated.Value(1)).current
    let bounce = useRef(new Animated.Value(0)).current
    const fadeIn = ()=>{
        Animated.timing(fadeAnim,{
            toValue:0,
            duration:2000,
            useNativeDriver:true
        }).start()
    }

    const fadeOut =()=>{
        Animated.timing(fadeAnim,{
            toValue:1,
            duration:2000,
            useNativeDriver:true
        }).start()
    }

    const bounceDown = ()=>{
        Animated.spring(bounce,{
            toValue:500,
            duration:500,
            useNativeDriver:true
        }
        ).start()
    }

    const bounceUp = ()=>{
        Animated.spring(bounce,{
            toValue:0,
            duration:500,
            useNativeDriver:true
        }
        ).start()
    }
    return(
        <View style={styles.contianer}>
            <Animated.View style={[styles.block,{opacity:fadeAnim,transform:[{translateY:bounce}]}]}>

            </Animated.View>
            <TouchableOpacity style={styles.button}  onPress={fadeIn}>
                <Text> fade in  </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}  onPress={fadeOut}>
                <Text> fade out  </Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.button} onPress={bounceUp} >
            <Text> bounce doown  </Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.button} onPress={bounceDown} >
            <Text> bounce up  </Text>
            </TouchableOpacity>
        </View>
    )
}

export default AnimationDemo
const styles = StyleSheet.create({
    contianer:{
        flex:1,
        backgroundColor:'grey',
        alignItems:'center',
        justifyContent:'center'
    },
    button:{
        width:100,
        height:50,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    
    },
    block:{
        width:200,
        height:200,
        backgroundColor:'blue'

    }
})