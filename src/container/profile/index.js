import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors, screenName } from '../../utils';
import { Profile } from './Profile';
import { CreateAddress, CreateId, CreateProfile, CreateTradeArea, Qualifications, Security } from '../auth';
import { ProfileInfo } from './ProfileInfo';
import { ChangePassword } from './ChangePassword';
import { WebViewScreen } from '../settings/WebViewScreen';



const Stack = createNativeStackNavigator();

export const ProfileStack = () => {
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

                <Stack.Screen name={screenName.profile} component={Profile} />

                {/* Below screens are handled in auth module & reused in this module */}
                <Stack.Screen name={screenName.createProfile} component={CreateProfile} />
                <Stack.Screen name={screenName.createAddress} component={CreateAddress} />
                <Stack.Screen name={screenName.createId} component={CreateId} />
                <Stack.Screen name={screenName.createTradeArea} component={CreateTradeArea} />
                <Stack.Screen name={screenName.qualifications} component={Qualifications} />
                <Stack.Screen name={screenName.security} component={Security} />

                <Stack.Screen name={screenName.profileInfo} component={ProfileInfo} />
                <Stack.Screen name={screenName.changePassword} component={ChangePassword} />
                <Stack.Screen name={screenName.webViewScreen} component={WebViewScreen} />


            </Stack.Navigator>
        </>
    )
}