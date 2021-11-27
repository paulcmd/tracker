import React, { useContext, useEffect } from 'react'
import { Context as AuthContext } from '../context/AuthContext'

const ResolveAuthScreen = ({ navigation }) => {
  const { tryLocalSignin } = useContext(AuthContext)

  useEffect(() => {
    tryLocalSignin()
    const navigateToSignup = ()=>navigation.navigate('Signup')
    navigateToSignup()
  }, [])

  return null   // we are returning null because we don't want to render anything
}
const styles = StyleSheet.create({})
export default ResolveAuthScreen

/* 
This screen is responsible for resolving the authentication state of the user.
It is like a loading screen. If user has 
*/