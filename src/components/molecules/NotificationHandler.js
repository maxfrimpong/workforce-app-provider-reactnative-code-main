import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Image, Platform, StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { showMessage } from 'react-native-flash-message';
import { colors, errorToast, fonts, images, screenName, successToast } from '../../utils';
import notifee, { AndroidImportance, EventType, IOSAuthorizationStatus } from '@notifee/react-native';
import { currentRouteName, navigate, navigationRef } from '../../navigation/RootNavigation';
import { useSelector } from 'react-redux';


export const NotificationHandler = () => {

    // ******************** Hooks Functions ************************ //

    const user = useSelector(state => state.loginReducer.loginData)

    useEffect(() => {
        onComponentMount()
    }, [])

    // Handle Notifee's Notification events
    useEffect(async () => {
        // Notifee background events
        notifee.onBackgroundEvent(async ({ type, detail }) => {
            const { notification, pressAction } = detail;
            console.log('background notification', type, detail, EventType.PRESS)
            // Check if the user pressed the notification
            if (type === EventType.PRESS && pressAction.id === "default") {
                // handle Notification
                console.log('background notification', notification)
                handleNotificatonPress(notification, notification?.data, notification?.id)
            }
        });

        // Notifee closed app events
        const initialNotification = await notifee.getInitialNotification();

        if (initialNotification) {
            console.log('Notifee caused application to open', initialNotification)
            const { notification } = initialNotification;
            handleNotificatonPress(notification, notification?.data)
        }

        // Notifee foreground events
        return notifee.onForegroundEvent(({ type, detail }) => {
            const { notification, notification: { data, id } } = detail;
            switch (type) {
                case EventType.DISMISSED:
                    console.log('User dismissed notification', detail?.notification);
                    handleRemoveNotifee(id)
                    break;
                case EventType.PRESS:
                    console.log('User pressed notification', detail?.notification);
                    handleNotificatonPress(notification, data, id)
                    break;
            }
        });
    }, []);

    // ******************** Main Functions ************************ //

    const onComponentMount = async () => {
        await checkPermission();
        await createNotificationListeners(); //add this line
        messaging().onMessage(async (remoteMessage) => {
            console.log('notification from component did mount', remoteMessage);
            if (currentRouteName() != screenName.chat ||
                remoteMessage?.data?.type != 'chat') {
                handleDisplayNotifee(
                    remoteMessage?.notification,
                    remoteMessage?.data,
                )
            }
        });
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage,
            );
            const { notification, data } = remoteMessage;
            handleNotificatonPress(notification, data)
        });
    }

    const checkPermission = async () => {
        // authorizationStatus: 1=Authrised, 0=Denied, -1=Not Determined, 2=Provisional
        const authorizationStatus = await messaging().requestPermission({
            sound: true,
            alert: true,
            badge: true,
        });
        console.log('Permission status:', authorizationStatus);
        if (authorizationStatus === 1) {
            console.log('Permission status:-------------------', authorizationStatus);
            await getToken();
        } else if (authorizationStatus === 0) {
            console.log('User denied permissions request');
            errorToast('Notification permissions are not allowed. Please update Workforce notification permissions from settings')
            await AsyncStorage.setItem('fcmToken', 'PERMISSION_DENIED_FOR_TOKEN');
        }
    }

    const getToken = async () => {
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log('FCM TOKEN async----', fcmToken);
        if (fcmToken == null) {
            fcmToken = await messaging().getToken();
            console.log('FCM TOKEN firebase ----', fcmToken);
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
                console.log('FCM TOKEN AsyncStoragefirebase ----', fcmToken);
            }
        }
    };

    const createNotificationListeners = async () => {
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log('Message handled in the background!', remoteMessage);
        });
        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                    const { notification, data } = remoteMessage
                    handleNotificatonPress(notification, data)
                }
            });
        // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        //     console.log('FCM Message Data:', remoteMessage);
        // });

        // return unsubscribe;
    };

    // ******************* Notifee Functions *********************** //

    const handleDisplayNotifee = async (notification, data) => {
        // Create a channel
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            sound: 'default',
            // importance: AndroidImportance.HIGH, //this key will tell notifee to show notification banner in foreground state
        });

        // Display a notification
        try {
            const notificationId = await notifee.displayNotification({
                title: notification?.title,
                body: notification?.body,
                sound: 'default',
                android: {
                    channelId,
                    pressAction: {
                        // Press action is used for notifee to 
                        // open app from background/ closed state
                        launchActivity: "default",
                        id: "default",
                    },
                    smallIcon: 'ic_notification',
                    color: colors.primary,
                },
                ios: {
                    sound: 'default',
                    foregroundPresentationOptions: {
                        alert: true,
                        badge: true,
                        sound: true,
                    },
                },
                data,
            });
            if (Platform.OS === 'android') {
                showInAppNotification(
                    notification,
                    data,
                    notificationId
                );
            }
        } catch (e) {
            console.log('Notifee error', e)
        }
    }

    const handleRemoveNotifee = async (id) => {
        await notifee.cancelNotification(id);
    }

    // ***************** Custom in app Notification ****************** //

    const handleNavigation = (main, screen, data) => {
        console.log('notification navigation handler initiated')
        navigate(main)
        if (screen) {
            setTimeout(() => {
                navigate(screen, data)
            }, 300)
        }
    }

    const notificationMapper = {
        'jobRequest': (data) => handleNavigation(screenName?.mainHome, screenName.homeScreen),
        'bidAcceptedByCustomer': (data) => handleNavigation(screenName.mainJobs, screenName.myPortfolio),
        'chat': (data) => handleNavigation(screenName.mainJobs, screenName.chat, { customerId: data?.customerId }),
    }

    const handleNotificatonPress = (notification, data, notificationId) => {
        console.log('Notification Pressed', user, notification, data)
        if (user?.token && data && data?.type) {
            notificationMapper[data?.type](data)
        }
        notificationId ? handleRemoveNotifee(notificationId) : null
    }

    const showInAppNotification = (notification, data, notificationId) => {
        console.log('in app notiifcation Banner initiated');
        const { title, body } = notification;

        showMessage({
            onPress: () => handleNotificatonPress(notification, data, notificationId),
            message: 'Workforce',
            type: 'default',
            color: colors.black,
            duration: 7000,
            titleStyle: styles.titleStyle,
            backgroundColor: '#ffffff', // background color
            style: styles.customNotificationBanner,
            renderCustomContent: () => <View style={styles.customContentWrapper}>
                <Image
                    style={styles.appIcon}
                    source={images.icLogo} />
                <View style={styles.textWrapper}>
                    <Text numberOfLines={1} style={styles.title}>
                        {title}
                    </Text>
                    <Text numberOfLines={2} style={styles.body}>
                        {body}
                    </Text>
                </View>
            </View>
        });
    };

    return (
        <Fragment>
        </Fragment>
    );
}

const styles = StyleSheet.create({
    customNotificationBanner: {
        margin: 5,
        elevation: 1,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        backgroundColor: colors.white,
    },
    customContentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: colors.white
    },
    appIcon: {
        height: 50,
        width: 50,
        borderRadius: 5,
        marginRight: 8
    },
    titleStyle: {
        fontFamily: fonts.primaryBold,
        fontSize: 14,
    },
    title: {
        fontFamily: fonts.primaryBold,
        fontSize: 13,
        color: colors.black
    },
    body: {
        fontFamily: fonts.primaryRegular,
        fontSize: 12,
        color: colors.black
    },
    textWrapper: {
        width: '80%'
    }
})