import React, { useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Header } from '../../components/molecules/Header'
import { apiConfig, colors, fonts, images, screenName } from '../../utils'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { useDispatch, useSelector } from 'react-redux'
import { verifyOtpRequest } from '../../store/modules/verifyOtp/actions'
import { sendOtpRequest } from '../../store/modules/sendOtp/actions'

export const VerifyOtp = ({ navigation, route }) => {

    const {
        login,
        screenFlow,
        passedData
    } = route?.params

    // ************* Hooks Functions ************** //

    const dispatch = useDispatch();

    console.log(route.params)

    //  initial State
    const [code, setCode] = useState('')


    // ************** Main Functions **************** //

    const handleResendOTP = () => {
        const data = null
        const sendOtpData = {
            mobileNumber: passedData.mobileNumber,
            countryCode: passedData.countryCode,
        }
        dispatch(sendOtpRequest(sendOtpData, data))
    }

    const handleVerifyOTP = () => {
        const verifyData = {
            mobileNumber: passedData?.mobileNumber,
            countryCode: passedData?.countryCode,
            OTP: code
        }
        dispatch(verifyOtpRequest(verifyData, screenFlow, passedData, navigation))
    }

    return (
        <View style={styles.mainView}>
            <SafeAreaView style={{ backgroundColor: colors.primary }} />
            <Header
                back
                title='Verify Code'
            />
            <KeyboardAwareScrollView contentContainerStyle={styles.contentContainerStyle}>

                <Text style={styles.stepText}>
                    Step A (2)
                </Text>

                <Text style={styles.numText}>
                    {`A code has been send to ${passedData?.mobileNumber} via SMS`}
                </Text>

                <SmoothPinCodeInput
                    cellStyle={{
                        borderBottomWidth: 1,
                        borderColor: colors.black,
                    }}
                    cellStyleFocused={{
                        borderColor: colors.primary,
                    }}
                    textStyle={{
                        fontSize: 24,
                        color: colors.primary,
                        fontWeight: '500'
                    }}
                    textStyleFocused={{
                        color: colors.primary
                    }}
                    codeLength={4}
                    keyboardType="numeric"
                    returnkey="done"
                    placeholder=""
                    value={code}
                    onTextChange={code => setCode(code)}
                />

                <TouchableOpacity
                    onPress={handleResendOTP}
                    style={styles.resendWrapper}>
                    <Text style={styles.resendIcon}>
                        Resend code
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleVerifyOTP}
                    style={styles.buttonWrapper}>
                    <Image
                        style={styles.buttonImage}
                        source={images.icTick}
                    />
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white
    },
    contentContainerStyle: {
        paddingHorizontal: '5%',
        alignItems: 'center'
    },
    logoBanner: {
        height: 130,
        width: 130,
        resizeMode: 'contain',
        marginTop: '5%',
        alignSelf: 'center'
    },
    stepText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 17,
        color: colors.primary,
        marginBottom: '9%',
        marginTop: '5%',
    },
    numText: {
        fontSize: 13,
        fontFamily: fonts.primaryLight,
        color: colors.textLightGrey,
        width: '50%',
        textAlign: 'center',
    },
    resendWrapper: {
        marginTop: '10%'
    },
    resendIcon: {
        fontFamily: fonts.primaryRegular,
        fontSize: 15,
        color: colors.textRed,
        textDecorationLine: 'underline'
    },
    buttonWrapper: {
        alignSelf: 'flex-end',
        marginTop: '25%',
        marginBottom: '5%'
    },
    buttonImage: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    }
})