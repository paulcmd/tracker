import React, { useContext } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-elements'
import { Context as LocationContext } from '../context/LocationContext'
import Map from '../components/Map'
import useLocation from '../hooks/useLocation'
import '../_mockLocation'

const TrackCreateScreen = () => {
    const isFocused = useIsFocused()
    const { addLocation } = useContext(LocationContext)
    const [err] = useLocation(isFocused, addLocation)  //addLocation is the callback in useLocation that will be called to pick up the location
    //err is the only parameter that is returned from useLocation. location is dispatched by addLocation to the  LocationContext reducer
    return (
        <SafeAreaView>
            <Text h2>Creat a Track!</Text>
            <Map />
            {err ? <Text>{err}</Text> : null}
        </SafeAreaView>
    )
}
//if we lose focus, unsub from the location updates
const styles = StyleSheet.create({})

export default TrackCreateScreen
