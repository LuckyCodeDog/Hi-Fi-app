import { View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'


const WifiMarker = () => {
    return (
        <View style={[styles.view, { backgroundColor: 'blue' }]}>
            <Icon name='wifi' size={25} color={"white"} style={styles.icon} ></Icon>
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        position: 'absolute',
        left: 5.5,
    },
    view: {
        width: 40,
        height: 40,
        borderRadius: 50,
        alignContent: "center",
        justifyContent: 'center'
    }
})
export default WifiMarker