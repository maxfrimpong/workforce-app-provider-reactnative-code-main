import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {FieldInput} from '../../components/formComponents';
import {Header} from '../../components/molecules/Header';
import {loginRequest} from '../../store/modules/login/actions';
import {sendOtpRequest} from '../../store/modules/sendOtp/actions';
import {apiConfig, fonts, images, screenName, validation} from '../../utils';
import {colors} from '../../utils/colors';

export const PasswordScreen = ({navigation, route}) => {
  /************************* Hooks Functions *************************/

  const {params} = route;

  const dispatch = useDispatch();

  const {control, handleSubmit, errors} = useForm({mode: 'all'});

  /********************** Form Functions *************************/

  const handleForgotPassword = () => {
    navigation.navigate(screenName.verifyOtp, {login: true});
    const data = {
      flow: 'forgot',
      ...params,
    };
    console.log('on submit press===>', data);
    const sendOtpData = {
      mobileNumber: params.mobileNumber,
      countryCode: params.countryCode,
    };
    dispatch(sendOtpRequest(sendOtpData, data));
  };

  const onSubmit = async formValues => {
    const firebaseToken = await AsyncStorage.getItem('fcmToken');
    console.log('clifford', firebaseToken);
    console.log('on submit press===>', formValues, params);
    const payload = {
      ...formValues,
      ...params,
      firebaseToken,
    };
    dispatch(loginRequest(payload));
  };

  return (
    <View style={styles.mainView}>
      <SafeAreaView style={{backgroundColor: colors.white}} />
      <Header back title="Sign in" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.mainText}>Password</Text>

        <FieldInput
          type="password"
          control={control}
          inputStyle={styles.inputStyle}
          inputViewStyle={styles.inputViewStyle}
          rules={validation.password}
          name="password"
          msg={errors?.password?.message}
          icon={images.icLock}
        />

        <TouchableOpacity
          onPress={handleForgotPassword}
          style={{alignSelf: 'flex-start'}}>
          <Text style={styles.containText}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.buttonWrapper}>
          <Image style={styles.buttonText} source={images.icTick} />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  logoBanner: {
    height: 130,
    width: 130,
    resizeMode: 'contain',
    marginTop: '5%',
    alignSelf: 'center',
  },
  mainText: {
    fontFamily: fonts.primaryBold,
    fontSize: 14,
    color: colors.textBlack,
    marginTop: '8%',
    marginLeft: '3%',
    alignSelf: 'flex-start',
  },
  inputViewStyle: {
    width: '100%',
    borderColor: colors.border,
    borderWidth: 0.5,
    marginTop: '2%',
    marginBottom: '2%',
    paddingHorizontal: '5%',
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
  },
  inputStyle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: colors.textGrey,
    padding: 0,
    paddingLeft: 10,
    width: '80%',
    height: 45,
  },
  rememberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: '4%',
    marginBottom: '1%',
  },
  rememberText: {
    fontFamily: fonts.primaryMedium,
    fontSize: 14,
    color: colors.textBlack,
    marginLeft: '3%',
  },
  rememberCheck: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  containText: {
    fontFamily: fonts.primaryBold,
    fontSize: 14,
    color: colors.textBlack,
    marginTop: '5%',
    alignSelf: 'flex-start',
  },
  buttonWrapper: {
    alignSelf: 'flex-end',
    marginTop: '30%',
    marginBottom: '5%',
  },
  buttonText: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
});
