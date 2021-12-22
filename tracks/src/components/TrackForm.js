import React, { useContext } from 'react'
import { Input, Button, Form } from 'react-native-elements'
import Spacer from './Spacer'
import { Context as LocationContext } from '../context/LocationContext'

const TrackForm = () => {
    const {
        state: { name, recording, locations },
        startRecording,
        stopRecording,
        changeName
    } = useContext(LocationContext)

    return (
        <>
            <Spacer>
                <Input
                    placeholder="Enter Track Name"
                    value={name}
                    onChangeText={changeName}
                />
            </Spacer>
            {recording ? (
                <Button title="Stop Recording" onPress={stopRecording} />
            ) : (
                <Button title="Start Recording" onPress={startRecording} />
            )}
            <Spacer />
            {!recording && locations.length ? (
                <Button title="Save Recording" />
            ) : null}
        </>
    )
}

export default TrackForm

// on press, flip a boolean to start recording
// set up app to record my location as I walk around the neighborhood 