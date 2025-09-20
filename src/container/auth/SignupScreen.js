import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    StyleSheet,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'
import { colors, fonts, images, screenName, validation, getCurrentLocation } from '../../utils'
import { useForm } from "react-hook-form";
import { successToast } from '../../utils/genricUtils';
import { FieldInput, PhoneFieldInput } from '../../components/formComponents';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header } from '../../components/molecules/Header';
import { useDispatch } from 'react-redux';
import { LoginCheckRequest } from '../../store/modules/login/actions';




export const SignupScreen = ({ navigation, route }) => {

    /************************* Hooks Functions *************************/

    const {
        params
    } = route;

    const dispatch = useDispatch()

    const { control,
        handleSubmit,
        errors,
    } = useForm({ mode: 'all' });

    const [countryData, setcountryData] = useState({
        phoneCode: '+233',
        flag: '🇬🇭',
    })

    useEffect(() => {
        getCurrentLocation()
    }, [])

    /********************** Form Functions *************************/

    const onSubmit = formValues => {
        console.log('on submit press===>', formValues)
        formValues['countryCode'] = countryData.phoneCode
        formValues['flowType'] = 'signup'
        dispatch(LoginCheckRequest(formValues, 'signup'))
    };

    return (
        <View style={styles.mainView}>
            <SafeAreaView style={{ backgroundColor: colors.white }} />
            <Header
                title='Sign up'
            />
            <KeyboardAwareScrollView>

                <View style={styles.loginWrapper}>

                    <Text style={styles.stepText}>
                        Step A (1)
                    </Text>

                    <Text style={styles.detailsText}>
                        Enter your mobile number
                    </Text>

                    <PhoneFieldInput
                        control={control}
                        inputStyle={styles.inputStylePhone}
                        inputViewStyle={styles.inputViewStylePhone}
                        rules={validation.phone}
                        name='mobileNumber'
                        msg={errors?.mobileNumber?.message}
                        placeholder={'Enter Your Mobile Number'}
                        flagValue={countryData.flag}
                        countryCode={countryData.phoneCode}
                        onSelectCode={(phoneCode, flag) => setcountryData({ phoneCode, flag })}
                    />

                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        style={styles.buttonView}>
                        <Text style={styles.signInText}>
                            NEXT
                        </Text>
                    </TouchableOpacity>

                    <View style={styles.signUpWrapper}>
                        <Text style={styles.signUpText}>
                            Already Have An Account?
                        </Text>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}>
                            <Text style={[styles.signUpText, {
                                fontFamily: fonts.primaryBold,
                                marginLeft: 4,
                                color: colors.textBlack
                            }]}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white
    },
    bgImage: {
        height: '100%',
        width: '100%',
    },
    logoBanner: {
        height: 130,
        width: 130,
        resizeMode: 'contain',
        marginTop: '5%',
        alignSelf: 'center'
    },
    loginWrapper: {
        flex: 1,
        paddingTop: '10%',
        paddingHorizontal: '8%',
        alignItems: 'center'
    },
    stepText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 17,
        color: colors.primary,
        marginBottom: '7%'
    },
    detailsText: {
        fontFamily: fonts.primaryBold,
        fontSize: 15,
        color: colors.textBlack,
        alignSelf: 'flex-start',
        marginBottom: '5%'
    },
    inputViewStylePhone: {
        width: '100%',
        borderColor: colors.inputBorder,
        borderWidth: .5,
        marginTop: '2%',
        marginBottom: '2%',
        paddingHorizontal: '5%',
        backgroundColor: colors.inputBackground,
        borderRadius: 10
    },
    inputStylePhone: {
        fontFamily: fonts.primaryRegular,
        fontSize: 12,
        borderColor: colors.textGrey,
        width: '70%',
        height: 45,
        padding: 0
    },
    buttonView: {
        width: '100%',
        marginVertical: '5%',
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signInText: {
        fontSize: 16,
        fontFamily: fonts.primaryBold,
        color: colors.white
    },
    signUpWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '25%'
    },
    signUpText: {
        fontSize: 13,
        fontFamily: fonts.primaryRegular,
        color: colors.textLightGrey
    },
})