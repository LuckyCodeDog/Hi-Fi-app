import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import axios from 'axios';

  const MyNodesScreen = () => {
    const [wifi,setWifi] =useState([])
    useEffect(
      ()=>{
        axios.get("http://localhost:3030/api")
        .then(res=>{
            console.log(res.data)
            setWifi(res.data[0]);
        })
        .catch(err=>{
          console.log(err)
          console.log("erro in fetching data " ,err)
        })
  
    },[])
    const sendRequest = ()=>{
      axios.get("http://10.0.2.2:3030/api")
        .then(res=>{
            console.log(res.data)
            setWifi(res.data[0]);
        })
        .catch(err=>{
          if (err.response) {
            console.log("响应状态码:", err.response.status);
            console.log("响应数据:", err.response.data);
            console.log("响应头部信息:", err.response.headers);
          } else {
            console.log("请求未发送或没有收到响应");
            console.log("错误信息:", err.message);
          }
          console.log("捕获的错误:", err);
        })
    }
    return (
      <View style={styles.container}>
        <Text></Text>
        <Button onPress={sendRequest} title='press me ' ></Button>
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