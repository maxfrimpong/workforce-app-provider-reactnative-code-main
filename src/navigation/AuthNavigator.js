import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenName} from '../utils';
import {
  ForgotPassword,
  LoginScreen,
  PasswordScreen,
  RegistrationType,
  SetPassword,
  CreateProfile,
  VerifyOtp,
  WelcomeScreen,
  CreateAddress,
  CreateId,
  CreateTradeArea,
  Qualifications,
  Security,
  AuthThanks,
} from '../container/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {updateAuthModule} from '../container/auth/WelcomeScreen';
import {WebViewScreen} from '../container/settings/WebViewScreen';
import {SignupScreen} from '../container/auth/SignupScreen';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  const [skipIntro, setSkipIntro] = useState(null);

  useEffect(() => {
    const checkSkipIntro = async () => {
      const value = await AsyncStorage.getItem('skipIntro');
      setSkipIntro(value);
    };
    checkSkipIntro();
  }, [skipIntro, updateAuthModule]);

  console.log('skipIntro', skipIntro);

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
      }}>
      {skipIntro !== 'true' && (
        <Stack.Screen name={screenName.welcome} component={WelcomeScreen} />
      )}
      <Stack.Screen name={screenName.login} component={LoginScreen} />
      <Stack.Screen name={screenName.signup} component={SignupScreen} />
      <Stack.Screen name={screenName.password} component={PasswordScreen} />
      <Stack.Screen name={screenName.verifyOtp} component={VerifyOtp} />
      <Stack.Screen name={screenName.forgot} component={ForgotPassword} />
      <Stack.Screen name={screenName.createProfile} component={CreateProfile} />
      <Stack.Screen name={screenName.setPassword} component={SetPassword} />
      <Stack.Screen
        name={screenName.registrationType}
        component={RegistrationType}
      />
      <Stack.Screen name={screenName.createAddress} component={CreateAddress} />
      <Stack.Screen name={screenName.createId} component={CreateId} />
      <Stack.Screen
        name={screenName.createTradeArea}
        component={CreateTradeArea}
      />
      <Stack.Screen
        name={screenName.qualifications}
        component={Qualifications}
      />
      <Stack.Screen name={screenName.security} component={Security} />
      <Stack.Screen name={screenName.authThanks} component={AuthThanks} />
      <Stack.Screen name={screenName.webViewScreen} component={WebViewScreen} />
    </Stack.Navigator>
  );
};
