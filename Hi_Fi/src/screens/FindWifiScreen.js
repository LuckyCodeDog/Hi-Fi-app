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
import { SelectList } from 'react-native-dropdown-select-list';
import MapView, { Marker } from 'react-native-maps';
import WifiMapMarker from '../components/WifiMapMarker';
import { SearchBar, Card, Input } from '@rneui/themed';
import WifiCard from '../components/WifiCard';
// set size
const { width, height } = Dimensions.get("window")
const CARD_HEIGHT = 220
const CARD_WIDTH = width * 0.8
const SPACE_FOR_CARD_INSET = CARD_WIDTH * 0.1 - 10
const Padding = (width - CARD_WIDTH) / 2

const FindWifiScreen = () => {
  // get from backend 
  const initData = {
    initialRegion: {
      latitude: -43.64532061931982,
      longitude: 172.4642259485763,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0221,
    },
    //  get more info if needed
    wifiList: [
      {
        name: "wifi1",
        coordinate: {
          latitude: -43.64532061931982,
          longitude: 172.4642259485763
        }
      },
      {
        name: "wifi2",
        coordinate: {
          latitude: -43.64231213421989,
          longitude: 172.47189882630357
        }
      },
      {
        name: "wifi3",
        coordinate: {
          latitude: -43.64395447295253,
          longitude: 172.472956226081
        }
      },
      {
        name: "wifi4",
        coordinate: {
          latitude: -43.647430468722135,
          longitude: 172.46338221035705
        }
      },

    ]
  }
  const [state, setState] = useState(initData)
  const [search, setSearch] = useState(null)
  const _map = useRef(null)
  const _scrollView = useRef(null)

  let mapIndex = 0
  let mapAnimation = new Animated.Value(0)
  useEffect(
    () => {
      mapAnimation.addListener(
        ({ value }) => {

          let index = Math.floor(value / CARD_WIDTH + 0.3)
          if (index >= state.wifiList.length) {
            index = state.wifiList.length - 1
          }
          if (index < 0) {
            index = 0
          }
          clearTimeout(timer)
          const timer = setTimeout(() => {
            if (mapIndex != index) {
              mapIndex = index
            }
            const { coordinate } = state.wifiList[mapIndex]
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
    }
  )
  const data = [
    { key: '1', value: 'Mobiles', disabled: true },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers', disabled: true },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ]
  // animation 
  const interpolations = state.wifiList.map((wifi, index) => {
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
    const markerID = parseInt(strID);
    let x = (markerID * CARD_WIDTH - 40);
    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  }

  const updateSearch = (search) => {
    console.log(search)
  }

  // need to consider the distance 
  const getSearchData = ()=>{
      const dataList =  state.wifiList.map((wifi,index)=>{
            return {key:index, value:wifi.name}
        })

      return dataList
  }

  return (
    <View
      style={styles.container}
    >

      <MapView initialRegion={state.initialRegion}
        style={styles.map}
        ref={_map}
      >
        {state.wifiList.map((wifi, index) => {
          return <WifiMapMarker key={index} id={index} coordinate={wifi.coordinate} color={interpolations[index].color} onPressMarker={onPressMarker} ></WifiMapMarker>
        })}

      </MapView>
      <View style={styles.searchBar}>
        <SelectList data={getSearchData}    inputStyles={{fontSize:20}}  setSelected={(value)=>{setSearch(value)}}  save='key' dropdownStyles={{backgroundColor:"white",borderBlockColor:"blue",borderColor:'white'}} boxStyles={{backgroundColor:'white',borderColor:'white'}} ></SelectList>
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


        {state.wifiList.map(
          (wifi, index) => (
            <WifiCard key={index} cardTitle={wifi.name}></WifiCard>
          )
        )}

      </Animated.ScrollView>

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
    width: "85%",
    left:'7.5%',
    top:"5%"
  }
});

export default FindWifiScreen;
