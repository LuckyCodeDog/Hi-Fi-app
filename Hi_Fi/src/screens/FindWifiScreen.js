import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import MapView from 'react-native-maps';
import WifiMapMarker from '../components/WifiMapMarker';
import { SearchBar, Dialog, CheckBox, Button } from '@rneui/themed';
import WifiCard from '../components/WifiCard';
import { useRoute } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons"
import AFIcon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
// set size
const { width, height } = Dimensions.get("window")
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8
const SPACE_FOR_CARD_INSET = CARD_WIDTH * 0.1 - 10
const Padding = (width - CARD_WIDTH) / 2

const FindWifiScreen = ({ navigation }) => {
  // get from backend 
  const initData = {
    initialRegion: {
      latitude: -43.64532061931982,
      longitude: 172.4642259485763,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0221,
    },
   
  }

  const route = useRoute()
  const types = ["Public Locations", "24/7", "Cafe/Food", "Offices"]
  const [state, setState] = useState(initData)
  const [wifiList, setWifiList]= useState([])
  const [search, setSearch] = useState(null)
  const [filterVisible, setFilterVisible] = useState(false)
  // hard code
  const [filter, setFilter] = useState(types)
  const [check1, setCheck1] = useState(true);
  const publicLocation = check1 ? "Public Locations" : null
  const [timeCheck, setTimeCheck] = useState(true)
  const openTime = timeCheck ? "24/7" : null
  const [cafeCheck, setCafeCheck] = useState(true)
  const cafe = cafeCheck ? "Cafe/Food" : null
  const [officeCheck, setOfficeCheck] = useState(true)
  const offices = officeCheck?"Offices":null
  const filterState = [publicLocation, openTime, cafe, offices]
  const _map = useRef(null)
  const _scrollView = useRef(null)

  let mapIndex = 0
  let mapAnimation = new Animated.Value(0)

  //listen the wifiname from searchScreen and scroll to the card
  useEffect(() => {
    if (route.params !== undefined) {
      let { wifiId } = route.params
      let x = (wifiId * CARD_WIDTH - 40);
      _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
    }
  }, [route])


  useEffect(
    () => {
      axios.get("http://10.0.2.2:3030/api")
      .then(res=>{
          let josonWifi =  JSON.parse(res.data.records)
          josonWifi=JSON.parse(josonWifi)
          setWifiList(josonWifi)
      })
      .catch(err=>{
        console.log("geting data error",err)
      })
    }
  ,[])
    useEffect(()=>{
      mapAnimation.addListener(
        ({ value }) => {
          let index = Math.floor(value / CARD_WIDTH + 0.3)
          if (index >= wifiList.length) {
            index = wifiList.length - 1
          }
          if (index < 0) {
            index = 0
          }
          clearTimeout(timer)
          const timer = setTimeout(() => {
            if (mapIndex != index) {
              mapIndex = index
            }
            const { coordinate } = wifiList[mapIndex]
            _map.current.animateToRegion(
              {
                ...coordinate,
                longitudeDelta: state.initialRegion.longitudeDelta,
                latitudeDelta: state.initialRegion.latitudeDelta
              }
            )
          }, 100)
        }
      )
    })

  // animation 
  const interpolations = wifiList.map((wifi, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH
    ]
    const color = mapAnimation.interpolate(
      {
        inputRange,
        outputRange: ["blue", "red", "blue"],
        extrapolate: 'clamp',
      }
    )
    return { color }

  })


  const onPressMarker = (marker) => {
    const strID = marker.nativeEvent.id
    console.log(strID)
    const markerID = parseInt(strID);
    let x = (markerID * CARD_WIDTH - 40);
    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  }


  // need to consider the scale
  const getSearchData = () => {
    const dataList = wifiList.map((wifi, index) => {
      return { key: index, value: wifi.name }
    })

    return dataList
  }


  const navigateToSearchScreen = () => {
    navigation.navigate("SearchScreen", { wifiList: wifiList })
  }

  const onSubmitFilter=()=>{
   newlist= state.wifiList.filter((wifi)=>{

      return filterState.includes(wifi.type)
    
    })
    setWifiList(newlist)
    setFilterVisible(!filterVisible)
  }

  
  return (
    <View style={styles.container} >

      <MapView initialRegion={state.initialRegion}
        style={styles.map}
        ref={_map}
      >
        {wifiList.map((wifi, index) => {
          return <WifiMapMarker key={index} id={index}  coordinate={wifi.coordinate} color={interpolations[index].color} onPressMarker={onPressMarker} ></WifiMapMarker>
        })}
      </MapView>


      <View style={styles.searchBar}>
        <View style={{ flex: 7 }}>
          <SearchBar lightTheme={true} inputContainerStyle={{ backgroundColor: "whitesmoke" }} containerStyle={{ backgroundColor: "white" }} round={true} onPressIn={navigateToSearchScreen} ></SearchBar>
        </View>
        <View style={{ flex: 1 }}>
          <AFIcon name='list-ul' size={30} color={'blue'} style={{ marginTop: 10 }} onPress={() => { setFilterVisible(!filterVisible) }} ></AFIcon>
          <Text style={{ color: "blue" }}>Filter</Text>
        </View>
      </View>


      <Animated.ScrollView
        ref={_scrollView}
        style={styles.scrollView}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment='center'
        scrollEventThrottle={1}
        snapToInterval={CARD_WIDTH}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation
                }
              }
            }
          ],
          { useNativeDriver: false }
        )}
      >
        {wifiList.map(
          (wifi, index) => (
            <WifiCard key={index} cardTitle={wifi.router_name}></WifiCard>
          )
        )}
      </Animated.ScrollView>
    
        <Dialog isVisible={filterVisible} onBackdropPress={onSubmitFilter} >
          <Dialog.Title title='Filter' ></Dialog.Title>
          <ScrollView style={{ width: "100%", height:"50%"}}>
            <CheckBox title="Public Locations" checked={check1}
              onPress={() => {
                setCheck1(!check1)
              }}></CheckBox>
            <CheckBox title="24/7" checked={timeCheck} onPress={() => { 
              setTimeCheck(!timeCheck) }}></CheckBox>
            <CheckBox title="Cafe/Food" checked={cafeCheck} onPress={()=>{setCafeCheck(!cafeCheck)}}></CheckBox>
            <CheckBox title="Office" checked={officeCheck} onPress={()=>{setOfficeCheck(!officeCheck)}}></CheckBox>
          </ScrollView>
          <Button title="Confirm" type='outline' onPress={onSubmitFilter} />
        </Dialog>
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'flex-end',
  },
  map: {
    height: "100%",
    width: "100%"
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10
  },
  Card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT
  },
  searchBar: {
    position: 'absolute',
    top: 0,
    width: "100%",
    flexDirection: 'row',
    backgroundColor: 'white'
  }
});

export default FindWifiScreen;
