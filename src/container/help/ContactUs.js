import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch} from 'react-redux';
import {hideLoading, showLoading} from '../../components/customLoader/action';
import {Header} from '../../components/molecules';
import {Request} from '../../services';
import {
  apiConfig,
  apiSuccess,
  colors,
  errorToast,
  fonts,
  images,
  screenName,
  successToast,
} from '../../utils';

export const ContactUs = ({navigation}) => {
  // *********** Hooks Functions ************ //

  const dispatch = useDispatch();

  const [supportData, setSupportData] = useState({
    title: '',
    msg: '',
    orderId: '',
  });

  // *********** Main Functions *********** //

  const validateForm = () => {
    const newArray = [
      supportData?.name,
      supportData?.msg,
      supportData?.orderId,
    ];
    if (newArray.includes('')) {
      errorToast('All fields are required');
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      dispatch(showLoading(false));
      try {
        console.log('supportData supportData', supportData);
        const response = await Request.post(apiConfig.support, supportData);
        console.log('Send support message response', response);
        if (response.status == apiSuccess) {
          successToast('Message sent successfully');
          navigation.goBack();
        } else {
          errorToast(response.message);
        }
        dispatch(hideLoading(false));
      } catch (error) {
        console.log('API ERROR', error);
        dispatch(hideLoading(false));
      }
    }
  };

  return (
    <View style={styles.mainView}>
      <KeyboardAwareScrollView>
        <Header
          back
          title="Help & Support"
          headerColor={colors.primary}
          headingColor={colors.white}
        />

        <Text style={styles.helpDescText}>
          Feel free to get in touch with us
        </Text>

        <View style={styles.inputView}>
          <TextInput
            style={[
              styles.input,
              {
                textAlign: 'left',
              },
            ]}
            placeholder="Order ID"
            value={supportData?.orderId}
            onChangeText={orderId =>
              setSupportData(data => ({
                ...data,
                orderId,
              }))
            }
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={[
              styles.input,
              {
                textAlign: 'left',
              },
            ]}
            placeholder="Title"
            value={supportData?.title}
            onChangeText={title =>
              setSupportData(data => ({
                ...data,
                title,
              }))
            }
          />
        </View>

        <View
          style={[
            styles.inputView,
            {
              height: 150,
              justifyContent: 'flex-start',
              marginTop: '3%',
              paddingTop: '3%',
            },
          ]}>
          <TextInput
            style={[
              styles.input,
              {
                textAlign: 'left',
              },
            ]}
            placeholder="Your message here..."
            value={supportData?.msg}
            onChangeText={msg =>
              setSupportData(data => ({
                ...data,
                msg,
              }))
            }
          />
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.updateDisputeButton}>
          <Text style={styles.updateText}>Send</Text>
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
  imageBackground: {
    width: '100%',
    height: 300,
    marginBottom: '5%',
  },
  helpDescText: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: colors.textGrey,
    alignSelf: 'center',
    marginVertical: '4%',
  },
  inputView: {
    height: 50,
    width: '90%',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.itemBackground,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: '5%',
    alignSelf: 'center',
    marginTop: '2%',
  },
  input: {
    fontSize: 14,
    fontFamily: fonts.primaryRegular,
    padding: 0,
    margin: 0,
    width: '100%',
  },
  updateDisputeButton: {
    width: '90%',
    backgroundColor: colors.primary,
    height: 60,
    alignItems: 'center',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: '15%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  updateText: {
    fontSize: 18,
    fontFamily: fonts.primaryBold,
    color: colors.white,
  },
});
