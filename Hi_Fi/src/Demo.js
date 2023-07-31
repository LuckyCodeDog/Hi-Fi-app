import React, { useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import WifiMapMarker from './components/WifiMapMarker';
const Demo = () => {
  const panY = useRef(new Animated.Value(650)).current;
  const screenHeight = useRef(0);
  const hiddenHeight = 650; // 菜单隐藏的高度

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
    },
    onPanResponderMove: (_, gestureState) => {
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy < -50) {
        Animated.timing(panY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dy > 50) {
        Animated.timing(panY, {
          toValue: hiddenHeight,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    },
  });
  const initialRegion = {
    latitude: -43.64532061931982,
    longitude: 172.4642259485763,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0221,
  }

  const wifiList = [
    {
      name:"wifi1",
      coordinate: {
        latitude: -43.64532061931982,
        longitude: 172.4642259485763
      }
    },
    {
      name:"wifi2",
      coordinate: {
        latitude: -43.64231213421989,
        longitude: 172.47189882630357
      }
    },
    {
      name:"wifi3",
      coordinate: {
        latitude: -43.64395447295253,
        longitude: 172.472956226081
      }
    },
    {
      name:"wifi4",
      coordinate: {
        latitude: -43.647430468722135,
        longitude: 172.46338221035705
      }
    },

  ]
  return (
    <View
      style={styles.container}
    >
      <MapView initialRegion={initialRegion}
        style={{ height: "100%", width: "100%" }}
      >
        {wifiList.map((wifi,index)=>{
          return <WifiMapMarker key={index} coordinate={wifi.coordinate} ></WifiMapMarker>
        })}
 
       
      </MapView>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.menu,
          {
            transform: [
              {
                translateY: panY,
              },
            ],
          },
        ]}
      >
        <Text>Slide up menu content</Text>
      </Animated.View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-end',
  },
  menu: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
});

export default Demo;
