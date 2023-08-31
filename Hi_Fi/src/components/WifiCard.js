import { Card, Button } from "@rneui/themed";
import { View, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window")
const CARD_HEIGHT = 150
const CARD_WIDTH = width * 0.8
const SPACE_FOR_CARD_INSET = CARD_WIDTH * 0.1 - 10


const WifiCard = (props) => {
    return (
        <View style={styles.contianer}>
            <Card>
                <Card.Title>{props.cardTitle}</Card.Title>
                <Card.Divider></Card.Divider>
           
                <Button title='Navigate To' type="outline" loading={false}></Button>
            </Card>
        </View>
    )
}
export default WifiCard
const styles = StyleSheet.create({
    contianer: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        position:"relative",
        bottom: 0
    }
})