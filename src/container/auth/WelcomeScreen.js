import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fonts, images, screenName, validation} from '../../utils';
import {colors} from '../../utils/colors';
import {welcomeData} from '../../utils/staticData';

export var updateAuthModule;

export const WelcomeScreen = ({navigation}) => {
  // ****** Hooks Functions ****** //

  const [step, setstep] = useState(0);

  // ****** Hooks Functions ****** //

  const handleNextPress = () => {
    step < 2 ? setstep(step + 1) : goToSignin();
  };

  const goToSignin = () => {
    AsyncStorage.setItem('skipIntro', 'true');
    navigation.navigate(screenName.login);
  };

  return (
    <View style={styles.mainView}>
      <SafeAreaView style={{backgroundColor: colors.white}} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <Image style={styles.logoImg} source={welcomeData[step].image} />
        <Text style={styles.detailText}>{welcomeData[step].title}</Text>
        <Text style={styles.descText}>{welcomeData[step].description}</Text>

        <View style={styles.indicatorWrapper}>
          {welcomeData.map((item, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                {
                  backgroundColor:
                    index === step ? colors.primary : colors.border,
                },
              ]}
            />
          ))}
        </View>

        <View
          style={[
            styles.buttonsContainer,
            {
              justifyContent: step < 2 ? 'space-between' : 'center',
            },
          ]}>
          {step < 2 && (
            <TouchableOpacity
              onPress={goToSignin}
              style={[
                styles.buttonWrapper,
                {
                  borderWidth: 1,
                  borderColor: colors.textLightBlack,
                  backgroundColor: colors.white,
                },
              ]}>
              <Text
                style={[
                  styles.buttontext,
                  {
                    color: colors.textLightBlack,
                  },
                ]}>
                Sign In
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleNextPress}
            style={[
              styles.buttonWrapper,
              {
                width: step < 2 ? '43%' : '90%',
              },
            ]}>
            <Text style={styles.buttontext}>
              {step < 2 ? 'Next' : 'Finish'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {},
  logoImg: {
    height: 380,
    width: '100%',
    resizeMode: 'contain',
  },
  detailText: {
    fontFamily: fonts.primaryBold,
    fontSize: 23,
    color: colors.black,
    textAlign: 'center',
    marginVertical: '5%',
  },
  descText: {
    fontFamily: fonts.primaryRegular,
    fontSize: 18,
    width: '90%',
    color: colors.textGrey,
    marginVertical: '3%',
    textAlign: 'center',
    alignSelf: 'center',
  },
  indicatorWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4%',
    alignSelf: 'center',
  },
  indicator: {
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    marginRight: 5,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '10%',
    paddingHorizontal: '5%',
  },
  buttonWrapper: {
    width: '43%',
    backgroundColor: colors.primary,
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttontext: {
    fontSize: 17,
    fontFamily: fonts.primaryMedium,
    color: colors.white,
  },
});
