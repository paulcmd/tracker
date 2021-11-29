import React from 'react';
    import { StyleSheet } from 'react-native';
    import { SafeAreaView } from 'react-native-safe-area-context';
    import { Text } from 'react-native-elements';
    import Map from '../components/Map';

    const TrackCreateScreen = () => {
      return (
        <SafeAreaView >
          <Text h2>Creat a Track!</Text>
          <Map />
        </SafeAreaView>
      );
    }

    const styles = StyleSheet.create({})

    export default TrackCreateScreen;