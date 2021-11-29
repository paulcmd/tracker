import React, { useContext } from 'react'
import { Text, View , StyleSheet} from 'react-native'
import { Button } from 'react-native-elements'
import { Context as AuthContext } from '../context/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacer from '../components/Spacer'

const AccountScreen = () => {
    const { signout } = useContext(AuthContext)
    return (
        <SafeAreaView>
            <Text style={{ fontSize: 48 }}>AccountScreen!</Text>
            <Spacer>
            <Button title="Sign Out" onPress={signout} />
            </Spacer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})

export default AccountScreen
