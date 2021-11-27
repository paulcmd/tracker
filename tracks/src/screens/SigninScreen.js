import React, { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'

const SigninScreen = ({ navigation }) => {
    const { state, signin, clearErrorMessage } = useContext(AuthContext)
    const { errorMessage } = state

    useEffect(() => {
        const clearErrorOnBlur = navigation.addListener('blur', () => {
            clearErrorMessage()
        })

        return clearErrorOnBlur
    }, [navigation])

    return (
        <View style={styles.container}>
            <AuthForm
                headerText="Sign In to Tracker"
                errorMessage={errorMessage}
                submitButtonText="Sign In"
                onSubmit={signin}
            />
            <NavLink
                text="Dont have an account? Sign Up instead"
                routeName="Signup"
            />
        </View>
    )
}

export default SigninScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 200
    }
})

/* 
NB: enter emails with @ and .com mongoose is checking the email format
*/