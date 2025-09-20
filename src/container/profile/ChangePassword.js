import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../../components/customLoader/action'
import { FieldInput } from '../../components/formComponents'
import { Header } from '../../components/molecules'
import { Request } from '../../services'
import { loginSuccess } from '../../store/modules/login/actions'
import { apiConfig, apiSuccess, colors, errorToast, fonts, images, successToast, validation } from '../../utils'

export const ChangePassword = ({ navigation, route }) => {

    /************************* Hooks Functions *************************/

    const dispatch = useDispatch()

    const { control,
        handleSubmit,
        errors,
        watch,
    } = useForm({ mode: 'all' });

    const newPassword = watch('password', '')

    /********************** Form Functions *************************/

    const onSubmit = async formValues => {
        console.log('on submit press===>', formValues)
        dispatch(showLoading(false))
        try {
            const response = await Request.post(
                apiConfig.changePassword,
                formValues
            );
            console.log('ChangePassword response', response)
            if (response.status == apiSuccess) {
                dispatch(loginSuccess(response?.data))
                successToast('Password Changed Successfully')
                navigation.goBack()
            } else {
                errorToast(response.message)
            }
            dispatch(hideLoading(false))
        } catch (error) {
            console.log('API ERROR', error)
            dispatch(hideLoading(false))
        }
    };

    return (
        <View style={styles.mainView}>
            <Header
                title='Change Password'
                back
            />

            <KeyboardAwareScrollView contentContainerStyle={styles.contentContainerStyle}>


                <FieldInput
                    type='password'
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.password}
                    name='currentPassword'
                    placeholder='Old Password'
                    msg={errors?.currentPassword?.message}
                />

                <FieldInput
                    type='password'
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.password}
                    placeholder='New Password'
                    name='password'
                    msg={errors?.password?.message}
                />

                <FieldInput
                    type='password'
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.confirmPassword(newPassword)}
                    name='cnfpassword'
                    placeholder='Confirm Password'
                    msg={errors?.cnfpassword?.message}
                />

                <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
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
        paddingHorizontal: '10%',
        alignItems: 'center'
    },
    logoBanner: {
        height: 130,
        width: 130,
        resizeMode: 'contain',
        marginTop: '5%',
        alignSelf: 'center',
        marginBottom: '10%'
    },
    inputViewStyle: {
        width: '100%',
        borderColor: colors.border,
        borderBottomWidth: .5,
        marginTop: '2%',
        marginBottom: '2%',
    },
    inputStyle: {
        fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: colors.textGrey,
        padding: 0,
        paddingLeft: 10,
        width: '85%',
        height: 45,
    },
    buttonWrapper: {
        alignSelf: 'flex-end',
        marginVertical: '20%',
    },
    buttonImage: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
})