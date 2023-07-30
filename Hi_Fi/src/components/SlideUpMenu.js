import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated ,FlatList} from 'react-native';

const SlideUpMenu = () => {
  const panY = useRef(new Animated.Value(-5000)).current;
  const screenHeight = useRef(0);
  let hiddenHeight = 0; // Will be updated later

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // Set to respond only to vertical gestures
      return Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
    },
    onPanResponderMove: (_, gestureState) => {
    },
    onPanResponderRelease: (_, gestureState) => {
      const velocityThreshold = 0.3; // Tweak this value to adjust sensitivity
      if (gestureState.dy < -50 || gestureState.vy < -velocityThreshold) {
        //Slide up or fast swipe up, fully show menu
        Animated.timing(panY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        // Slide down or fast swipe down, hide menu
        Animated.timing(panY, {
          toValue: hiddenHeight,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  useEffect(() => {
    // Update hiddenHeight after the component mounts
    hiddenHeight = screenHeight.current + 700; // Adjust 500 to desired hidden height
  }, []);

  return (
    <View style={styles.container}>
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
       
        {/* Your other menu content goes here */}
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
    backgroundColor: 'grey',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    height: '100%',
  },
});

export default SlideUpMenu;
