import React, { useState } from 'react'
import { Input, Button, Form } from 'react-native-elements'
import Spacer from './Spacer'

const TrackForm = (changeName) => {
    const [title, setTitle] = useState('')
    
    return (
        <>
            <Spacer>
                <Input
                    placeholder="Enter Track Name"
                    value={title}
                    onChangeText={setTitle}
                />
            </Spacer>
            <Button title="Start Recording" 
            onPress={() => changeName(title)}
            />
        </>
    )
}

export default TrackForm

// on press, flip a boolean to start recording
