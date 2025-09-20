import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RoundButton } from '../../components/atoms/RoundButton'
import { FieldInput } from '../../components/formComponents'
import { Header } from '../../components/molecules/Header'
import { colors, fonts, images, screenName, validation } from '../../utils'

export const SetPassword = ({ navigation, route }) => {

    // ************* Hooks Functions ************** //

    const { params } = route;

    const {
        control,
        handleSubmit,
        errors,
        getValues,
        watch
    } = useForm({ mode: 'all' });

    const newPassword = watch('password', '')

    // ************** Main Functions ************** //

    const onSubmit = formValues => {
        const {
            mobileNumber,
            countryCode,
        } = params?.passedData;
        const passedData = {
            ...formValues,
            mobileNumber,
            countryCode,
        }
        navigation.navigate(screenName.registrationType, { passedData })
    }

    return (
        <View style={styles.mainView}>
            <SafeAreaView style={{ backgroundColor: colors.primary }} />
            <Header
                title='Set Password'
                back
            />
            <KeyboardAwareScrollView contentContainerStyle={styles.contentContainerStyle}>
                <Text style={styles.stepText}>
                    Step A (3)
                </Text>

                <Text style={styles.fieldHeading}>
                    Password
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

                <Text style={styles.fieldHeading}>
                    Confirm password
                </Text>
                <FieldInput
                    type='password'
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.confirmPassword(newPassword)}
                    name='confirmPassword'
                    msg={errors?.confirmPassword?.message}
                    icon={images.icLock}
                />

                <RoundButton
                    onPress={handleSubmit(onSubmit)}
                    mainstyles={{
                        marginTop: '20%'
                    }}
                    icon={images.icTick}
                />

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
        paddingHorizontal: '8%'
    },
    stepText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 17,
        color: colors.primary,
        marginBottom: '9%',
        marginTop: '5%',
        alignSelf: 'center'
    },
    fieldHeading: {
        fontSize: 14,
        fontFamily: fonts.primaryBold,
        color: colors.textBlack,
        alignSelf: 'flex-start',
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
})