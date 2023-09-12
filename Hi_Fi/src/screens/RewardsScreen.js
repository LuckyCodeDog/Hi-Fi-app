import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RewardScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rewards</Text>
      </View>
      <View style={styles.rewardItem}>
        <Text style={styles.rewardTitle}>Earn Coins</Text>
        <Text style={styles.rewardDescription}>
          Collect coins for each action you take in the app.
        </Text>
        <View style={styles.coinBlock}>
          <Text style={styles.coinAmount}>100</Text>
          <Text style={styles.coinLabel}>Coins</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightpurple', // Use the desired light purple color
  },
  header: {
    backgroundColor: 'white', // Use white as the header background color
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rewardItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  rewardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rewardDescription: {
    fontSize: 16,
    marginTop: 8,
  },
  coinBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  coinAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  coinLabel: {
    fontSize: 18,
  },
});

export default RewardScreen;
