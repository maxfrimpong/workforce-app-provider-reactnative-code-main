import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Header} from '../../components/molecules';
import {postJobStart} from '../../store/modules/home/actions';
import {
  getCardsListStart,
  removeCardStart,
} from '../../store/modules/payment/actions';
import {colors, customAlert, fonts, images, screenName} from '../../utils';
import moment from 'moment-timezone';
import {makePaymentStart} from '../../store/modules/job/actions';
import {RetryButton} from '../../components/atoms/RetryButton';
import {Paystack} from 'react-native-paystack-webview';

export const PaymentMethod = ({navigation, route}) => {
  // ****************** Hooks Functions ******************* //

  const [isMobileMoney, setIsMobileMoney] = useState(false);

  const dispatch = useDispatch();

  const {cardList, loading} = useSelector(state => ({
    cardList: state.paymentReducer?.cardList,
    loading: state.loadingReducer.loading,
  }));

  const {user, adminSettings} = useSelector(state => ({
    user: state.loginReducer.loginData,
    adminSettings: state.homeReducer.adminSettings?.[0],
  }));
  // console.log('adminSettings', adminSettings)

  const paymentConfig = adminSettings?.Payment_Config ?? null;
  const paymentMode = adminSettings?.App_Settings?.Payment_Mode ?? null;

  console.log('route', route);
  const {params} = route;

  useEffect(() => {
    dispatch(getCardsListStart());
  }, []);

  // ****************** Main Functions ******************* //

  const handleRemoveCard = _id => () => {
    customAlert(
      'Remove Card',
      'Are you sure you want to remove this card?',
      'Remove',
      'Cancel',
      {onAccept: () => dispatch(removeCardStart({_id}))},
    );
  };

  const handlePaymentSelect = (payload, type) => {
    let timezone = moment.tz.guess();
    const newData = {
      ...params,
      paymentSourceRefNo: payload?._id,
      paymentMethod: 'paystack',
      paymentType: type,
    };
    dispatch(makePaymentStart(newData, navigation));
  };

  return (
    <View style={styles.mainView}>
      <SafeAreaView style={{backgroundColor: colors.primary}} />
      <Header
        borderRound
        back={params?.back ?? false}
        menu={params?.back ? false : true}
        title="Payment Method"
      />
      {loading ? null : cardList && cardList.length > 0 ? (
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          {cardList.map(item => (
            <TouchableOpacity
              onLongPress={handleRemoveCard(item?._id)}
              onPress={() =>
                params?.back ? handlePaymentSelect(item, 'card') : null
              }
              style={styles.payItem}>
              <Image style={styles.cardIcon} source={{uri: item?.logo}} />
              <Text style={styles.cardText}>**** {item?.lastd}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            onPress={() => (params?.back ? setIsMobileMoney(true) : null)}
            style={styles.payItem}>
            <Image style={styles.cardIcon} source={images.smartphone} />
            <Text style={styles.cardText}>Mobile money</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <RetryButton hideButton />
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate(screenName.addCard)}
        style={styles.buttonWrapper}>
        <Image style={styles.buttonImage} source={images.icAdd} />
      </TouchableOpacity>

      {isMobileMoney ? (
        <>
          <Paystack
            paystackKey={paymentConfig?.[paymentMode]?.Publishable_Key}
            // paystackKey={'pk_live_b97a408da9c29e2814e3904d7151bac4da2de253'}

            amount={adminSettings?.App_Settings?.customerPlatformFee || '1.00'}
            billingEmail={user?.email}
            billingMobile={user?.mobileNumber}
            channels={['mobile_money']}
            onCancel={res => {
              console.log('cancel res', res);
              setIsMobileMoney(false);
            }}
            currency={'GHS'}
            onSuccess={res => {
              if (res?.status == 'success') {
                let posData = {
                  _id: res?.transactionRef?.reference,
                };
                handlePaymentSelect(posData, 'mobile');
                setIsMobileMoney(false);
              }
            }}
            autoStart={true}
          />
        </>
      ) : null}
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
    paddingVertical: '5%',
  },
  cardIcon: {
    height: 25,
    width: 40,
    resizeMode: 'contain',
  },
  cardText: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: colors.textGrey,
    marginLeft: '3%',
  },
  payItem: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginTop: '3%',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: '5%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: colors.white,
    elevation: 5,
  },
  plus: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    position: 'absolute',
    right: '10%',
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: '10%',
    right: '5%',
  },
  buttonImage: {
    height: 55,
    width: 55,
    resizeMode: 'contain',
  },
});

const thirdParty = [
  {
    name: 'Google Pay',
    img: images.icGooglePay,
  },
  {
    name: 'Apple Pay',
    img: images.icApplePay,
  },
  {
    name: 'PayPal Pay',
    img: images.icPaypal,
  },
];
