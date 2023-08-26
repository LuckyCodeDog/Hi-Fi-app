import React from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import { CheckBox, Card } from '@rneui/themed'


const FilterPage = () => (
    <View style={styles.container}>
        
        <CheckBox title="Public Locations"></CheckBox>
        <CheckBox title="24/7"></CheckBox>
        <CheckBox title="Cafe/Food"></CheckBox>
        <CheckBox title="Office"></CheckBox>
        <CheckBox title="Cafe"></CheckBox>
        <CheckBox title="Malls"></CheckBox>
        <CheckBox title="Public Libraris" />
        <CheckBox title="Shops" ></CheckBox>
        <CheckBox title='Hotel/Motel' ></CheckBox>
    </View>
)

const styles = StyleSheet.create(
    {
        container: { flex: 1, backgroundColor: "white" }
    }
)
export default FilterPage;