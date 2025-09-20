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
import {Paystack} from 'react-native-paystack-webview';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {hideLoading, showLoading} from '../../components/customLoader/action';
import {FieldDate, FieldInput} from '../../components/formComponents';
import {Header} from '../../components/molecules';
import {addCardStart} from '../../store/modules/payment/actions';
import {colors, errorToast, fonts, images, validation} from '../../utils';

export const AddCard = ({navigation}) => {
  /************************* Hooks Functions *************************/

  const dispatch = useDispatch();

  const {control, handleSubmit, errors} = useForm({mode: 'all'});

  // const {user, adminSettings} = useSelector(state => ({
  //   user: state.loginReducer.loginData,
  //   adminSettings: state.homeReducer.adminSettings?.[0],
  // }));

  const {user, adminSettings} = useSelector(state => ({
    user: state.loginReducer.loginData,
    adminSettings: state.homeReducer.adminSettings?.[0],
  }));
  console.log('appUser', user);
  const paymentConfig = adminSettings?.Payment_Config ?? null;
  const paymentMode = adminSettings?.App_Settings?.Payment_Mode ?? null;

  /********************** Form Functions *************************/

  const onSubmit = formValues => {
    console.log('on submit press===>', formValues);
    const {number, email, expDate, cvv} = formValues;
    const newItem = {
      card: {
        number,
        cvv,
        expiry_year: expDate.substring(3, 7),
        expiry_month: expDate.substring(0, 2),
      },
      email: user?.email,
      amount: '1',
    };
    console.log('After on submit press===>', newItem);
    connectWithPaystack(newItem);
  };

  // const connectWithPaystack = payload => {
  //   const paymentConfig = adminSettings?.Payment_Config ?? null;
  //   const paymentMode = adminSettings?.App_Settings?.Payment_Mode ?? null;
  //   console.log(paymentConfig?.[paymentMode]);
  //   dispatch(showLoading(false));
  //   fetch('https://api.paystack.co/charge', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${
  //         paymentConfig?.[paymentMode]?.Secret_Key ?? ''
  //         //   paymentConfig?.[paymentMode]?.Publishable_Key ?? ''
  //       }`,
  //     },
  //     body: JSON.stringify(payload),
  //   })
  //     .then(response => response.json())
  //     .then(res => {
  //       console.log('Pay stack API response', res);
  //       if (res?.status) {
  //         const {authorization} = res?.data;
  //         const newItem = {
  //           userType: 'driver',
  //           name: authorization?.brand,
  //           lastd: authorization?.last4,
  //           token: authorization?.authorization_code,
  //           amountDeducted: '1',
  //           details: null,
  //           email: user?.email,
  //         };
  //         console.log('Add card Data', newItem);
  //         dispatch(addCardStart(newItem, navigation));
  //       } else {
  //         errorToast(res?.message);
  //       }
  //       dispatch(hideLoading(false));
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       dispatch(hideLoading(false));
  //     });
  // };

  const connectWithPaystack = payload => {
    console.log('paystack initiated', payload);
    dispatch(showLoading(false));
    fetch('https://api.paystack.co/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          paymentConfig?.[paymentMode]?.Secret_Key ?? ''
        }`,
      },
      body: JSON.stringify(payload),
    })
      .then(response => response.json())
      .then(res => {
        console.log('Pay stack API response', res);
        if (res?.status) {
          const {authorization} = res?.data;
          const newItem = {
            userType: 'driver',
            name: authorization?.brand,
            lastd: authorization?.last4,
            token: authorization?.authorization_code,
            amountDeducted: '1',
            details: null,
            email: user?.email,
          };
          console.log('Add card Data', newItem);
          dispatch(addCardStart(newItem, navigation));
        } else {
          errorToast(res?.data?.message);
        }
        dispatch(hideLoading(false));
      })
      .catch(error => {
        console.log(error);
        dispatch(hideLoading(false));
      });
  };

  const onback = () => {
    setTimeout(() => {
      // dispatch(addCardStart(newItem, navigation))
      navigation.goBack();
    }, 50);
  };

  return (
    <View style={styles.mainView}>
      <SafeAreaView style={{backgroundColor: colors.primary}} />

      <>
        <Paystack
          paystackKey={paymentConfig?.[paymentMode]?.Publishable_Key}
          // paystackKey={'pk_live_b97a408da9c29e2814e3904d7151bac4da2de253'}

          amount={'1.00'}
          billingEmail={'dd' + user?.email}
          billingMobile={user?.mobileNumber}
          channels={['bank', 'card', 'qr', 'ussd', 'mobile_money']}
          onCancel={res => {
            console.log('cancel res', res);
            onback();
          }}
          currency={'GHS'}
          onSuccess={res => {
            console.log('Cancelled');
            if (res?.status == 'success') {
              console.log('response', res);
              let posData = {
                reference: res?.transactionRef?.reference,
                userType: 'driver',
              };
              dispatch(addCardStart(posData, navigation));

              // this.props.posRequest(posData, this.props.navigation);
            }
          }}
          autoStart={true}
        />
      </>

      {/* <Header back title="Add Card" /> */}
      {/* <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.fieldTitle}>CARD NUMBER</Text>

        <FieldInput
          control={control}
          inputStyle={styles.inputStyle}
          inputViewStyle={styles.inputViewStyle}
          rules={validation.required}
          //   maxLength={16}
          name="number"
          msg={errors?.number?.message}
        /> */}

      {/* <Text style={styles.fieldTitle}>
                    EMAIL
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.email}
                    type='email'
                    name='email'
                    msg={errors?.email?.message}
                /> */}

      {/* <View style={styles.horizonWrapper}>
          <View style={styles.horizonItem}>
            <Text style={styles.fieldTitle}>EXP. DATE</Text>
            <FieldDate
              control={control}
              inputStyle={styles.inputDateStyle}
              inputViewStyle={styles.inputViewStyle}
              rules={validation.required}
              name="expDate"
              format="MM/YYYY"
              msg={errors?.expDate?.message}
              minimumDate={new Date()}
            />
          </View>

          <View style={styles.horizonItem}>
            <Text style={styles.fieldTitle}>SECURITY CODE</Text>
            <FieldInput
              control={control}
              inputStyle={styles.inputStyle}
              inputViewStyle={styles.inputViewStyle}
              rules={validation.required}
              maxLength={3}
              name="cvv"
              msg={errors?.cvv?.message}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.buttonWrapper}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView> */}
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
    marginVertical: '5%',
  },
  fieldTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 15,
    color: colors.textBlack,
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
  inputDateStyle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: colors.textGrey,
    paddingLeft: 10,
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 15,
  },
  horizonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  horizonItem: {
    width: '48%',
  },
  deliverAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    alignSelf: 'flex-start',
    marginVertical: '5%',
  },
  deliverIcon: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
    marginRight: '3%',
  },
  deliverText: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: colors.textLightGrey,
  },
  billingAddress: {
    fontFamily: fonts.primaryBold,
    fontSize: 20,
    color: colors.textBlack,
  },
  inputAddressViewStyle: {
    width: '100%',
    borderColor: colors.border,
    borderBottomWidth: 0.5,
  },
  buttonWrapper: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '10%',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: fonts.primaryBold,
    color: colors.white,
  },
});
