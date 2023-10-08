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
  const backupData =  [
    {
        coordinate: {latitude: -43.64397272242113, longitude: 172.45931671074345},
        elastic_ip: "192.168.1.100",
        ip_address: "192.168.1.1",
        last_seen: "2023-08-21T02:00:00.000Z",
        mac_address: "00:11:22:33:44:55",
        router_id: 20000,
        router_name: "Router A",
        security_type: "WPA2",
        signal_strength: 90,
        type:"Public Locations"
    },
    {
        coordinate: {latitude: -43.64757346558215, longitude: 172.46311855995506},
        elastic_ip: "192.168.1.101",
        ip_address: "192.168.1.2",
        last_seen: "2023-08-21T03:30:00.000Z",
        mac_address: "AA:BB:CC:DD:EE:FF",
        router_id: 20001,
        router_name: "Router B",
        security_type: "WPA",
        signal_strength: 80,
        type:"Public Locations"
    },
    {
        coordinate: {latitude: -43.64282796733643,  longitude: 172.46878322112332},
        elastic_ip: "192.168.1.102",
        ip_address: "192.168.1.3",
        last_seen: "2023-08-21T04:45:00.000Z",
        mac_address: "11:22:33:44:55:66",
        router_id: 20002,
        router_name: "Router C",
        security_type: "WEP",
        signal_strength: 70,
        type:"24/7"
    },
    {
        coordinate: {"latitude": -43.64135085289721,  "longitude": 172.46495582860095},
        elastic_ip: "192.168.1.103",
        ip_address: "192.168.1.4",
        last_seen: "2023-08-21T05:30:00.000Z",
        mac_address: "A1:B2:C3:D4:E5:F6",
        router_id: 20003,
        router_name: "Router D",
        security_type: "WPA2",
        signal_strength: 85,
        type:"Cafe/Food"
    },
    {
        coordinate: {latitude: -43.64400972936753, longitude: 172.46834951664258},
        elastic_ip: "192.168.1.104",
        ip_address: "192.168.1.5",
        last_seen: "2023-08-21T06:15:00.000Z",
        mac_address: "1A:2B:3C:4D:5E:6F",
        router_id: 20004,
        router_name: "Router E",
        security_type: "WPA",
        signal_strength: 75,
        type:"Offices"
    }
]

  const route = useRoute()
  const types = ["Public Locations", "24/7", "Cafe/Food", "Offices"]
  const [state, setState] = useState(initData)
  const [wifiList, setWifiList]= useState(backupData)
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

  
 
  // useEffect(()=>{
  //   setWifiList(backupData)
  // })
  // useEffect(
  //   () => {
  //     axios.get("http://10.0.2.2:3030/api")
  //     .then(res=>{
  //         let josonWifi =  JSON.parse(res.data.records)
  //         josonWifi=JSON.parse(josonWifi)
  //         setWifiList(josonWifi)
  //         console.log(josonWifi)
  //     })
  //     .catch(err=>{
  //       console.log("geting data error",err)
  //     })
  //   }
  // ,[])
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
    console.log("@@1",filterState)
   newlist= backupData.filter((wifi)=>{
      console.log(filterState.includes(wifi.type))
      return filterState.includes(wifi.type)
    
    })
    setWifiList(newlist)
    console.log("@@@3",newlist)
    
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
