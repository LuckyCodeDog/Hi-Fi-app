import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

  const MyNodesScreen = () => {
    const [wifi,setWifi] =useState([])
    useEffect(
      ()=>{
        axios.get("http://localhost:3000/")
        .then(res=>{
            console.log(res)
            setWifi(res.data);
        })
        .catch(err=>{
          console.log(err)
          console.log("erro in fetching data " ,err)
        })
  
    })
   
    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
    );
  };

  export default MyNodesScreen;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });