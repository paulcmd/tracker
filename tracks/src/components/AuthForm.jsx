import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import Spacer from '../components/Spacer'

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    console.log('email from auth form : ', email)
    return (
        <>
            <Spacer />
            <Spacer>
                <Text h3>{headerText}</Text>
            </Spacer>
            <Spacer>
                <Input
                    label="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </Spacer>

            <Spacer>
                <Input
                    secureTextEntry
                    label="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </Spacer>
            <>
                {errorMessage ? (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : null}
            </>
            <Spacer>
                <Button
                    title={submitButtonText}
                    onPress={() => onSubmit({ email, password })}
                />
            </Spacer>
        </>
    )
}

export default AuthForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    },
    errorMessage: {
        color: 'red',
        fontSize: 16,
        marginLeft: 15
    },
    link: {
        color: 'blue',
        fontSize: 18,
        marginLeft: 50,
        marginTop: 15,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: 'blue'
    }
})
