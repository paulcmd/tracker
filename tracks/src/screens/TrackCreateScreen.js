import React, { useContext, useCallback } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-elements'
import { Context as LocationContext } from '../context/LocationContext'
import Map from '../components/Map'
import useLocation from '../hooks/useLocation'
import TrackForm from '../components/TrackForm'
import '../_mockLocation'

const TrackCreateScreen = () => {
    const isFocused = useIsFocused()
    const {
        state: { recording }, // destructuring recording from state
        addLocation
    } = useContext(LocationContext)

    const callback = useCallback((location) => {
        addLocation(location, recording)
    },[recording])

    const [err] = useLocation(isFocused || recording , callback)  // if isFocused is true or user hit recording(even if isFocused is not true), then we want to get location, 
    //otherwise we don't want to get location
    //addLocation is the callback in useLocation that will be called to pick up the location
    // addLocation will be used in TrackForm to add recorded location to the track
    //err is the only parameter that is returned from useLocation. location is dispatched by addLocation to the  LocationContext reducer

    // console.log('Track Name', name)
    return (
        <SafeAreaView>
            <Text h2>Creat a Track!</Text>
            <Map />
            {err ? <Text>{err}</Text> : null}
            <TrackForm />
        </SafeAreaView>
    )
}
//if we lose focus, unsub from the location updates
const styles = StyleSheet.create({})

export default TrackCreateScreen
