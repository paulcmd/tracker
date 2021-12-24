import React, { useContext, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { Context as TrackContext } from '../context/TrackContext'

const TrackListScreen = ({ navigation }) => {
    const isFocused = useIsFocused()
    const { state, fetchTracks } = useContext(TrackContext)

    console.log(state)

    useEffect(async () => {
        await fetchTracks()
    }, [isFocused])

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 48 }}>TrackListScreen!</Text>
            <FlatList 
            data={state}
            keyExtractor={item => item._id}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('TrackDetail', {
                                _id: item._id
                            })
                        }
                    >
                        <ListItem>
                            <ListItem.Content>
                                <ListItem.Title>{item.name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </TouchableOpacity>
                )
            }}
            />
           
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        top: 2,
        margin: 10,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#fff',
        padding: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5
    }
})

export default TrackListScreen
