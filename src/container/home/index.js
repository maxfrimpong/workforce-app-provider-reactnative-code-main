import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors, screenName } from '../../utils';
import { HomeScreen } from './HomeScreen';
import { JobDetails } from '../job/JobDetails';
import { PlaceBid } from './PlaceBid';


const Stack = createNativeStackNavigator();

export const HomeStack = () => {
    return (
        <>
            <StatusBar
                backgroundColor={colors.primary}
                barStyle='light-content'
            />
            <SafeAreaView style={{ backgroundColor: colors.primary }} />
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >

                <Stack.Screen name={screenName.homeScreen} component={HomeScreen} />
                <Stack.Screen name={screenName.jobDetails} component={JobDetails} />
                <Stack.Screen name={screenName.placeBid} component={PlaceBid} />


            </Stack.Navigator>
        </>
    )
}