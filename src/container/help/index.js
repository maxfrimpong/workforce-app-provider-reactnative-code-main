import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors, screenName } from '../../utils';
import { FAQ } from './FAQ';
import { ContactUs } from './ContactUs';


const Stack = createNativeStackNavigator();

export const HelpStack = () => {
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
                <Stack.Screen name={screenName.faq} component={FAQ} />
                <Stack.Screen name={screenName.contactUs} component={ContactUs} />

            </Stack.Navigator>
        </>
    )
}