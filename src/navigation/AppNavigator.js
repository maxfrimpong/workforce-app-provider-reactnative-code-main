import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStack } from '../container/home';
import { screenName } from '../utils';
import { CustomDrawer } from '../components/molecules';
import { PaymentStack } from '../container/payment';
import { ProfileStack } from '../container/profile';
import { JobsStack } from '../container/job';
import { HelpStack } from '../container/help';
import { Earning } from '../container/earning';
import { PanicStack } from '../container/panic';



//Import Stack 
const Drawer = createDrawerNavigator();

// Drawer Navigator
export const AppNavigator = () => {
    return (
        <>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false
                }}
                drawerType="front"
                initialRouteName={screenName.mainHome}
                drawerStyle={{
                    width: '75%'
                }}
                drawerContent={(props) => <CustomDrawer {...props} />}
            >
                <Drawer.Screen
                    name={screenName.mainHome}
                    component={HomeStack} />

                {/* Portflio module is handled in job folder */}
                <Drawer.Screen
                    name={screenName.mainJobs}
                    component={JobsStack} />

                <Drawer.Screen
                    name={screenName.mainProfile}
                    component={ProfileStack} />

                <Drawer.Screen
                    name={screenName.mainPayment}
                    component={PaymentStack} />
                {/* Jobs module is handled in Earning folder */}
                <Drawer.Screen
                    name={screenName.earning}
                    component={Earning} />

                <Drawer.Screen
                    name={screenName.mainPanic}
                    component={PanicStack} />

                <Drawer.Screen
                    name={screenName.mainHelp}
                    component={HelpStack} />



            </Drawer.Navigator>
        </>
    )
}