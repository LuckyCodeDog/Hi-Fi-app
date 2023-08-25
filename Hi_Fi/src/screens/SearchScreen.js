import { SearchBar, ListItem, Avatar } from "@rneui/themed";
import { View, StyleSheet, Text, SectionList, FlatList, } from "react-native";
import WifiMarker from "../components/WifiMarker";
import { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchScreen = ({ route, navigation }) => {
    const { wifiList } = route.params
    // may need pass singal in later work
    const [wifis, setWifis] = useState(wifiList)
    const [search, setSearch] = useState('')

    const onSearchWifi = (value) => {
        setSearch(value)
        console.log("@@@@@@", value, typeof (value))
        let filteredWifi = wifiList.filter((wifi) => {
            return wifi.name.includes(value)
        })
        console.log(filteredWifi)
        setWifis(filteredWifi)

    }

    const renderItem = ({ item }) => (
        <ListItem bottomDivider onPress={() => { navigation.navigate("findWifi", { wifiId: item.id }) }}>
            <WifiMarker ></WifiMarker>
            <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle></ListItem.Subtitle>
            </ListItem.Content>
            <Icon name="exclamation-circle" size={25}></Icon>
        </ListItem>

    )

    return (
        <View
            style={[
                styles.container,

            ]}>
            <View style={styles.searchBar}>
                <SearchBar lightTheme={true} round={true} value={search} onChangeText={onSearchWifi}></SearchBar>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList data={wifis} renderItem={renderItem}>
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