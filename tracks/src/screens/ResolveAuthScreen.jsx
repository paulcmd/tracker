import React, { useContext, useEffect } from 'react'
import { Context as AuthContext } from '../context/AuthContext'

const ResolveAuthScreen = ({ navigation }) => {
  const { tryLocalSignin } = useContext(AuthContext)

  const tokenLoading = async () => {
    try {
      await tryLocalSignin()
      navigation.navigate('Signup')
    } catch (e) {
      console.log('Error from tryLocalSignin : ', e)
    }
  }
  useEffect(() => {
    tokenLoading()
  }, [])

  return null   // we are returning null because we don't want to render anything
}
export default ResolveAuthScreen

/* 
This screen is responsible for resolving the authentication state of the user.
It is like a loading screen. If user has 

Problem I encountered : I was getting stuck on this screen after logging out. if no token, I was not getting redirected to the signup screen.
Solution : I used async await with tryLocalSignin() function to wait for the function to resolve, then navigate to the signup screen.
*/