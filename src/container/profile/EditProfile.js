import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../components/customLoader/action'
import { FieldInput, PhoneFieldInput } from '../../components/formComponents'
import { country } from '../../components/formComponents/country'
import { Header, MyImagePicker } from '../../components/molecules'
import { Request } from '../../services'
import { loginSuccess } from '../../store/modules/login/actions'
import { apiConfig, apiSuccess, colors, convertToFormData, errorToast, fonts, images, successToast, validation } from '../../utils'

export const EditProfile = ({
    navigation,
    route
}) => {

    /************************* Hooks Functions *************************/

    const dispatch = useDispatch()

    const user = useSelector(state => state.loginReducer.loginData)

    const { control,
        handleSubmit,
        errors,
        setValue,
    } = useForm({ mode: 'all' });

    const [countryData, setcountryData] = useState({
        phoneCode: '+1',
        flag: '🇺🇸',
    })
    const [profileImage, setprofileImage] = useState(null)

    useEffect(() => {
        if (user) {
            Object.entries(user).map(([key, value]) => {
                setValue(key, value)
            });
            if (user?.countryCode) {
                country.forEach(item => item?.dialCode === user?.countryCode
                    ? setcountryData({
                        phoneCode: item?.dialCode,
                        flag: item?.emoji,
                    }) : null)
            }
        }
    }, [])

    /********************** Form Functions *************************/

    const onSubmit = async formValues => {
        console.log('on submit press===>', formValues)
        let payload = formValues
        payload['countryCode'] = countryData.phoneCode
        if (profileImage !== null) {
            payload['profileImage'] = profileImage
        }
        const data = convertToFormData(payload)
        dispatch(showLoading(false))
        try {
            const response = await Request.post(
                apiConfig.updateProfile,
                data
            );
            console.log('Update Profile response', response)
            if (response.status == apiSuccess) {
                successToast('Profile Updated Successfully')
                dispatch(loginSuccess(response?.data))
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
                title='Edit Profile'
                back
            />

            <KeyboardAwareScrollView contentContainerStyle={styles.contentContainerStyle}>

                <MyImagePicker
                    onChange={src => setprofileImage(src)}
                >
                    <Image
                        style={styles.profileIcon}
                        source={profileImage !== null
                            ? { uri: profileImage.uri }
                            : user?.profileImage && user?.profileImage !== 'none'
                                ? { uri: user?.profileImage }
                                : images.dummyProfile}
                    />
                    <Image
                        style={styles.editIcon}
                        source={images.icCamera}
                    />
                </MyImagePicker>

                <Text style={styles.profileText}>
                    {user?.firstName} {user?.lastName}
                </Text>

                <View style={styles.formWrapper}>

                    <Text style={styles.fieldHeading}>
                        FIRST NAME
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.name}
                        name='firstName'
                        msg={errors?.firstName?.message}
                        icon={images.icUser}
                    />

                    <Text style={styles.fieldHeading}>
                        LAST NAME
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.name}
                        name='lastName'
                        msg={errors?.lastName?.message}
                        icon={images.icUser}
                    />

                    <Text style={styles.fieldHeading}>
                        EMAIL
                    </Text>
                    <FieldInput
                        type='email'
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.email}
                        name='email'
                        msg={errors?.email?.message}
                        icon={images.icMail}
                    />

                    <Text style={styles.fieldHeading}>
                        Mobile Number
                    </Text>
                    <PhoneFieldInput
                        control={control}
                        inputStyle={styles.inputStylePhone}
                        inputViewStyle={styles.inputViewStylePhone}
                        rules={validation.phone}
                        name='mobileNumber'
                        msg={errors?.mobileNumber?.message}
                        flagValue={countryData.flag}
                        countryCode={countryData.phoneCode}
                        onSelectCode={(phoneCode, flag) => setcountryData({ phoneCode, flag })}
                    />
                </View>

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
        paddingHorizontal: '6%',
        paddingVertical: '5%',
        alignItems: 'center'
    },
    profileIcon: {
        height: 80,
        width: 80,
        borderRadius: 40
    },
    editIcon: {
        height: 20,
        width: 20,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    profileText: {
        fontFamily: fonts.primaryBold,
        fontSize: 18,
        color: colors.textLightBlack,
        marginTop: 5,
    },
    formWrapper: {
        flex: 1,
        paddingTop: '10%',
        width: '100%'
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
        fontSize: 14,
        borderColor: colors.textGrey,
        width: '80%',
        height: 45,
        padding: 0
    },
    buttonWrapper: {
        alignSelf: 'flex-end',
        marginVertical: '6%',
    },
    buttonImage: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
})