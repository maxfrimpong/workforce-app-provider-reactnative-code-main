import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors, screenName } from '../../utils';
import { MyPortfolio } from './MyPortfolio';
import { JobDetails } from './JobDetails';
import { Chat } from './Chat';
import { PlatformCharge } from './PlatformCharge';
import { PaymentMethod } from '../payment/PaymentMethod';
import { AddCard } from '../payment/AddCard';



const Stack = createNativeStackNavigator();

export const JobsStack = () => {
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
                <Stack.Screen name={screenName.myPortfolio} component={MyPortfolio} />
                <Stack.Screen name={screenName.jobDetails} component={JobDetails} />
                <Stack.Screen name={screenName.platformCharge} component={PlatformCharge} />
                <Stack.Screen name={screenName.chat} component={Chat} />

                {/* Payment screens */}
                <Stack.Screen name={screenName.paymentMethod} component={PaymentMethod} />
                <Stack.Screen name={screenName.addCard} component={AddCard} />

            </Stack.Navigator>
        </>
    )
}