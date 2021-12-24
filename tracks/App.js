import React, { useContext, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createDrawerNavigator } from '@react-navigation/drawer'

import AccountScreen from './src/screens/AccountScreen'
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import TrackCreateScreen from './src/screens/TrackCreateScreen'
import TrackDetailScreen from './src/screens/TrackDetailScreen'
import TrackListScreen from './src/screens/TrackListScreen'
import { Provider as AuthProvider } from './src/context/AuthContext'
import { Context as AuthContext } from './src/context/AuthContext'
import { Provider as LocationProvider } from './src/context/LocationContext'
import { Provider as TrackProvider } from './src/context/TrackContext'
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'

const AuthStack = createStackNavigator()
const AuthStackFlow = () => (
    <AuthStack.Navigator
        initialRouteName="ResolveAuth"
        screenOptions={{
            header: () => null
        }}
    >
        <AuthStack.Screen name="ResolveAuth" component={ResolveAuthScreen} />
        <AuthStack.Screen name="Signup" component={SignupScreen} />
        <AuthStack.Screen name="Signin" component={SigninScreen} />
    </AuthStack.Navigator>
)

const TrackList = createStackNavigator()
const TrackListFlow = () => (
    <TrackList.Navigator initialRouteName="TrackList">
        <TrackList.Screen name="TrackList" component={TrackListScreen} />
        <TrackList.Screen name="TrackDetail" component={TrackDetailScreen} />
    </TrackList.Navigator>
)

const MainStack = createBottomTabNavigator()
const MainStackFlow = () => (
    <MainStack.Navigator initialRouteName="TrackListFlow">
        <MainStack.Screen name="TrackListFlow" component={TrackListFlow} />
        <MainStack.Screen name="TrackCreate" component={TrackCreateScreen} />
        <MainStack.Screen name="Account" component={AccountScreen} />
    </MainStack.Navigator>
)

const App = () => {
    const { state } = useContext(AuthContext)
    const { token } = state // token will come from either signin and signup cases in authReducer within AuthContext
    console.log('token from App : ', token)

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {!token ? <AuthStackFlow /> : <MainStackFlow />}
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default () => {
    return (
        <TrackProvider>
            <LocationProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </LocationProvider>
        </TrackProvider>
    )
}


//Order of providers doesnt matter.