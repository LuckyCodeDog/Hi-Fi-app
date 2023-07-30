import React, { useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';
import MapView from 'react-native-maps';

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

  return (
    <View
      style={styles.container}
    >
      <MapView initialRegion={{
        latitude: -43.64532061931982,
        longitude: 172.4642259485763,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
        style={{ height: "100%", width: "100%" }}
      >
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
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>
        <Text>1</Text>

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
