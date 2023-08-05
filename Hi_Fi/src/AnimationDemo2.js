import React from 'react';
import { View, Animated, StyleSheet, PanResponder } from 'react-native';

const AnimatedEventExample = () => {
  const position = new Animated.ValueXY();

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

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, { transform: [{ translateX: position.x }, { translateY: position.y }] }]}
        {...panResponder.panHandlers}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
});

export default AnimatedEventExample;
