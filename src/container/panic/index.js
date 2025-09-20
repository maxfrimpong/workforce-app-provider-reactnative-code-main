import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors, screenName } from '../../utils';
import { Panic } from './Panic';
import { MyContacts } from './MyContacts';



const Stack = createNativeStackNavigator();

export const PanicStack = () => {
    return (
        <>
            <StatusBar
                backgroundColor={colors.primary}
                barStyle='light-content'
            />
            <SafeAreaView style={{ backgroundColor: colors.white }} />
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name={screenName.panic} component={Panic} />
                <Stack.Screen name={screenName.myContacts} component={MyContacts} />

            </Stack.Navigator>
        </>
    )
}