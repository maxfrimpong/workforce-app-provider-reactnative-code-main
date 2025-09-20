import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors, screenName } from '../../utils';
import { PaymentMethod } from './PaymentMethod';
import { AddCard } from './AddCard';


const Stack = createNativeStackNavigator();

export const PaymentStack = () => {
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
                {/* Payment */}
                <Stack.Screen name={screenName.paymentMethod} component={PaymentMethod} />
                <Stack.Screen name={screenName.addCard} component={AddCard} />

            </Stack.Navigator>
        </>
    )
}