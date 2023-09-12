import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Account</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Push notifications</Text>
        <Switch />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Default home screen</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Language</Text>
        <Switch />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Help and support</Text>
        <Switch />
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
  },
  settingText: {
    fontSize: 18,
  },
});

export default SettingScreen;
