import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
import { FieldInput } from '../../components/formComponents'
import { Header } from '../../components/molecules/Header'
import { newPasswordRequest } from '../../store/modules/newPassword/actions'
import { fonts, images, screenName, validation } from '../../utils'
import { colors } from '../../utils/colors'
import { regexStrings } from '../../utils/strings'

export const ForgotPassword = ({ navigation, route }) => {

    /************************* Hooks Functions *************************/

    const {
        mobileNumber,
        countryCode,
        OTP
    } = route?.params

    const dispatch = useDispatch()

    const {
        control,
        handleSubmit,
        errors,
        getValues
    } = useForm({ mode: 'all' });

    /********************** Form Functions *************************/

    const onSubmit = formValues => {
        const payload = {
            ...formValues,
            confirmPassword: formValues.password,
            mobileNumber,
            countryCode,
            OTP
        }
        console.log('on submit press===>', formValues, route, payload)
        dispatch(newPasswordRequest(payload, navigation))
    };

    return (
        <View style={styles.mainView}>
            <SafeAreaView style={{ backgroundColor: colors.white }} />
            <Header
                back
                title='Reset Password'
            />
            <KeyboardAwareScrollView contentContainerStyle={styles.contentContainerStyle}>

                <Text style={styles.mainText}>
                    Reset your password
                </Text>
                <Text style={styles.descText}>
                    Please enter your new password
                </Text>

                <FieldInput
                    type='password'
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.password}
                    name='password'
                    msg={errors?.password?.message}
                    icon={images.icLock}
                />

                <Text style={styles.containText}>
                    Your password must contain:
                </Text>

                <View style={styles.containWrapper}>
                    <Image
                        style={styles.containIcon}
                        source={getValues('password') !== undefined && getValues('password').length > 5 ? images.icCircleCheck : images.icCircleUncheck}
                    />
                    <Text style={styles.atleastText}>
                        Atleast 6 characters
                    </Text>
                </View>

                <View style={styles.containWrapper}>
                    <Image
                        style={styles.containIcon}
                        source={getValues('password') !== undefined &&
                            getValues('password').match(regexStrings.containNumberRegex)
                            ? images.icCircleCheck
                            : images.icCircleUncheck}
                    />
                    <Text style={styles.atleastText}>
                        Contains a number
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    style={styles.buttonWrapper}>
                    <Image
                        style={styles.buttonText}
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
    mainText: {
        fontFamily: fonts.primaryBold,
        fontSize: 21,
        color: colors.textBlack,
        marginTop: '8%'
    },
    descText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 15,
        color: colors.textLightGrey,
        marginTop: '3%'
    },
    inputViewStyle: {
        width: '100%',
        borderColor: colors.border,
        borderWidth: .5,
        marginTop: '2%',
        marginBottom: '2%',
        paddingHorizontal: '5%',
        backgroundColor: colors.inputBackground,
        borderRadius: 10
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
    containText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 15,
        color: colors.textBlack,
        marginTop: '5%',
        alignSelf: 'flex-start',
    },
    containWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: '2%'
    },
    containIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginRight: '3%',
        borderRadius: 25 / 2,
    },
    atleastText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 13,
        color: colors.textBlack,
    },
    buttonWrapper: {
        alignSelf: 'flex-end',
        marginTop: '15%',
        marginBottom: '5%'
    },
    buttonText: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    }
})