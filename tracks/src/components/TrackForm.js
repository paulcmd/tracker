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
//console.log('locations : ', locations )
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
        </>
    )
}

export default TrackForm

// on press, flip a boolean to start recording
