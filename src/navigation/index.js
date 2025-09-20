import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigator} from './AuthNavigator';
import {errorToast, getCurrentLocation, screenName} from '../utils';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {AppNavigator} from './AppNavigator';
import {PermissionsAndroid, View, LogBox} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {NotificationHandler} from '../components/molecules';
import {navigationRef} from './RootNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Indicator} from '../components/atoms';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  // ****************** Hooks Functions ********************//
  const dispatch = useDispatch();

  const {user} = useSelector(state => ({
    user: state?.loginReducer?.loginData,
  }));

  useEffect(() => {
    LogBox.ignoreAllLogs();
    setTimeout(() => SplashScreen.hide(), 2000);
    fetchDeviceLocation();
  }, []);

  // ****************** Main Functions ********************//

  const fetchDeviceLocation = () => {
    if (Platform.OS === 'android') {
      // use async/await instead of .then()
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then(data => {
          console.log('gps turned on', data);
          requestLocationPermission();
        })
        .catch(err => {
          console.log('error in turing in on gps', err);
          errorToast(err.message);
        });
    } else {
      getCurrentLocation();
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'WorkForce needs access to your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {user?.token ? (
            <Stack.Screen name={screenName.app} component={AppNavigator} />
          ) : (
            <Stack.Screen name={screenName.auth} component={AuthNavigator} />
          )}
        </Stack.Navigator>
        <FlashMessage duration={6000} color={'#ffffff'} />
        <Indicator />
        <NotificationHandler />
      </NavigationContainer>
    </View>
  );
};

export default Navigator;
