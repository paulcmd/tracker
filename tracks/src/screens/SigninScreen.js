import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
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
        <SafeAreaView style={styles.container} edges={['top']}>
            <Spacer />
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
            
        </SafeAreaView>
    )
}

export default SigninScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 140,
        margin: 0,
    }
})

/* 
NB: enter emails with @ and .com mongoose is checking the email format
*/
