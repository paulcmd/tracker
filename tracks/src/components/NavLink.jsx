import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Spacer from '../components/Spacer'

const NavLink = ({ text, routeName }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
            <Spacer>
                <Text style={styles.link}>{text}</Text>
            </Spacer>
        </TouchableOpacity>
    )
}

export default NavLink

const styles = StyleSheet.create({
    link: {
        color: 'blue',
        alignContent: 'center',
        justifyContent: 'center',
        fontSize: 18,
        marginLeft: 30,
        marginTop: 15,
        marginBottom: 0,
        padding: 10,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: 'blue'
    }
})
