import { useContext } from 'react'
import { Context as TrackContext } from '../context/TrackContext'
import { Context as LocationContext } from '../context/LocationContext'
import { useNavigation } from '@react-navigation/native'

export default () => {

    const navigation = useNavigation()
    const { createTrack } = useContext(TrackContext)
    const {
        state: { name, locations },
        reset
    } = useContext(LocationContext)

    const saveTrack = async () => {
        await createTrack(name, locations)
        reset()
        navigation.navigate('TrackListFlow')
    }
    return [saveTrack] //by convention, hooks return values in an array, or object {}, but you can return as saveTrack without array or object
}
