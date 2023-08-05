import React,{useRef} from "react";
import { View, Animated, Text, StyleSheet,TouchableOpacity,PanResponder    } from "react-native";

const AnimationDemo = ()=>{
    const position = new Animated.ValueXY()
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
            toValue:1,
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

    const interpolatedValue = bounce.interpolate({
        inputRange:[0,1],
        outputRange:[0,500],
        extrapolate:'clamp'
    });

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
          [
            null,
            {
              dx: position.x, // 将手势的横向移动值映射到动画值的x轴
              dy: position.y, // 将手势的纵向移动值映射到动画值的y轴
            },
          ],
          { useNativeDriver: false } // 为了支持手势动画，需要设置为false
        ),
    });


    return(
        <View style={styles.contianer}>
            <Animated.View style={[styles.block,{opacity:fadeAnim,transform:[{translateY:position.y},{translateX:position.x}]}]} {...panResponder.panHandlers}>
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