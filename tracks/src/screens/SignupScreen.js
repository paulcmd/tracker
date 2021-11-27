import React, { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'

const SignupScreen = ({ navigation }) => {
    const { state, signup, clearErrorMessage } = useContext(AuthContext)
    const { errorMessage } = state

   
    // if screen not focused, then clear errorMessage
    useEffect(() => {
        const clearErrorOnBlur = navigation.addListener('blur', () => {
            // run this function when screen not focused(blur)
            clearErrorMessage()
        })

        return clearErrorOnBlur
    }, [navigation])

    return (
        <View style={styles.container}>
            <AuthForm
                headerText="Sign Up for Tracker"
                errorMessage={errorMessage}
                submitButtonText="Sign Up"
                onSubmit={signup} // onSubmit in AuthForm is collecting email and password. no need to pass in email and password here. a reference to the signup function from AuthContext is enough
            />
            <NavLink
                text="Already have an account? Sign in instead"
                routeName="Signin"
            />
        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    }
})
