import React from 'react'
import { StyleSheet, View } from 'react-native'

const Spacer = ({ children }) => {
    return <View style={styles.spacer}>{children}</View>
}

export default Spacer

const styles = StyleSheet.create({
    spacer: {
        margin: 15
    }
})

/* 
the point of this file is to create a spacer that can be used to space out elements
*/
