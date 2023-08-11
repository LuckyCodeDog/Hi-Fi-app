import { SearchBar, ListItem, Avatar } from "@rneui/themed";
import { View, StyleSheet, Text, SectionList, FlatList, } from "react-native";
import WifiMarker from "../components/WifiMarker";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchScreen = ({ route,navigation }) => {
    const { wifiList } = route.params
    // may need pass singal in later work
    const [state, setState] = useState(wifiList)

    const renderItem = ({ item }) => (
        <ListItem bottomDivider  onPress={()=>{ navigation.navigate("Find Wifi",{wifiId:item.id})}}>
            <WifiMarker ></WifiMarker>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle></ListItem.Subtitle>
            </ListItem.Content>
            <Icon  name="exclamation-circle" size={25}></Icon>
        </ListItem>

    )
    return (
        <View
            style={[
                styles.container,

            ]}>
            <View style={styles.searchBar}>
                <SearchBar lightTheme={true} round={true} ></SearchBar>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList data={wifiList} renderItem={renderItem}>
                </FlatList>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});

export default SearchScreen
// const styles = StyleSheet.create({
//     contianer: {
//         flex: '1',
//         width: "100%",
//         height: "100%",
//         backgroundColor: "white",

//     },
//     searchBar: {

//         top: 0,
//         width: "85%",
//         left: '7.5%',
//     },
//     wifiList: {
//         top: "10%",
//         height: '80%',
//         width: "100%"

//     }
// })