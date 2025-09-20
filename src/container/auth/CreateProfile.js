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
import { apiConfig, colors, convertToFormData, errorToast, fonts, screenName, validation } from '../../utils'
import { images } from '../../utils/images'
import { FieldInput, FieldSelect, PhoneFieldInput } from '../../components/formComponents';
import { useForm } from 'react-hook-form'
import { Header } from '../../components/molecules/Header'
import { useDispatch, useSelector } from 'react-redux'
import { sendOtpRequest } from '../../store/modules/sendOtp/actions'
import { StepCounter } from '../../components/atoms'
import { genderArray } from '../../utils/staticData'
import { updateProfileRequest } from '../../store/modules/profile/actions'


export const CreateProfile = ({ navigation, route }) => {

    /************************* Hooks Functions *************************/

    const {
        accountType,
        flowProfile, // Stores boolean value, true means update profile
    } = route?.params;


    const dispatch = useDispatch()

    const user = useSelector(state => state.loginReducer.loginData)

    const { control,
        handleSubmit,
        errors,
        setValue
    } = useForm({ mode: 'all' });

    const [termsAccepted, settermsAccepted] = useState(false)

    useEffect(() => {
        if (user?._id) {
            Object.entries(user).map(([key, value]) => {
                setValue(key, value)
            });
            if (user?.languages) {
                setValue('languages', user?.languages.toString())
            }
            settermsAccepted(user?.isTermsAndConditionsAgreed)
        }
    }, [])

    /********************** Form Functions *************************/

    const validateForm = () => {
        if (!termsAccepted) {
            errorToast('Please Accept the Terms & conditions.')
            return false
        } else {
            return true
        }
    }

    const onSubmit = formValues => {
        if (validateForm()) {
            if (flowProfile) {
                const formData = convertToFormData(formValues)
                dispatch(updateProfileRequest(formData, navigation))
            } else {
                navigation.navigate(screenName.createAddress, {
                    ...formValues,
                    ...route.params,
                    isTermsAndConditionsAgreed: termsAccepted,
                    flowProfile: false
                })
            }
        }
    };

    // ************** Render Individual Form **************** //

    const renderIndividualForm = () => {
        return (
            <>
                <Text style={[styles.fieldHeading, {
                    fontSize: 15
                }]}>
                    Bio
                </Text>

                <Text style={styles.fieldHeading}>
                    First name
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.name}
                    name='firstName'
                    msg={errors?.firstName?.message}
                />

                <Text style={styles.fieldHeading}>
                    Last name
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.name}
                    name='lastName'
                    msg={errors?.lastName?.message}
                />

                <Text style={styles.fieldHeading}>
                    Business name (If any)
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    name='businessName'
                />

                <View style={styles.horizontalWrapper}>
                    <View style={styles.horizontalItem}>
                        <Text style={styles.fieldHeading}>
                            Age
                        </Text>
                        <FieldInput
                            control={control}
                            inputStyle={styles.inputStyle}
                            inputViewStyle={styles.inputViewStyle}
                            rules={validation.required}
                            maxLength={2}
                            keyboardType='number-pad'
                            name='age'
                            msg={errors?.age?.message}
                        />
                    </View>

                    <View style={styles.horizontalItem}>
                        <Text style={styles.fieldHeading}>
                            Gender
                        </Text>
                        <FieldSelect
                            items={genderArray}
                            control={control}
                            inputViewStyle={styles.inputViewStyle}
                            rules={validation.required}
                            name='gender'
                            msg={errors?.gender?.message}
                        />
                    </View>
                </View>

                <Text style={styles.fieldHeading}>
                    Language(s)
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.required}
                    name='languages'
                    msg={errors?.languages?.message}
                />

            </>
        )
    }

    // ************** Render Comapany Form **************** //

    const renderCompanyForm = () => {
        return (
            <>
                <Text style={[styles.fieldHeading, {
                    fontSize: 15
                }]}>
                    Company Details
                </Text>

                <Text style={styles.fieldHeading}>
                    Registered Name
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.required}
                    name='companyName'
                    msg={errors?.companyName?.message}
                />

                <Text style={styles.fieldHeading}>
                    Company registration Number
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.required}
                    name='companyRegistrationNumber'
                    msg={errors?.companyRegistrationNumber?.message}
                />

                <Text style={styles.fieldHeading}>
                    Tax Identification Number (if Any)
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    name='taxIdentityNumber'
                    msg={errors?.taxIdentityNumber?.message}
                />

                <Text style={styles.fieldHeading}>
                    VAT (if Any)
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    name='vat'
                    msg={errors?.vat?.message}
                />



                <Text style={styles.fieldHeading}>
                    Year of Establishment
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.numaric}
                    maxLength={4}
                    keyboardType='number-pad'
                    name='establishmentYear'
                    msg={errors?.establishmentYear?.message}
                />

            </>
        )
    }

    const handleWebViewNavigation = (screen, name, url) => () => {
        navigation.navigate(screen, {
            data: {
                name,
                url
            }
        })
    }

    return (
        <View style={styles.mainView}>

            <SafeAreaView style={{ backgroundColor: colors.primary }} />
            <Header
                back
                title='Create your Profile'
                borderRound={colors.primary}

            />
            <KeyboardAwareScrollView>

                <StepCounter
                    isCompany={accountType !== "individual"}
                    showIndicator
                    stepValue={1}
                />

                <View style={styles.formWrapper}>

                    {accountType == 'individual'
                        ? renderIndividualForm()
                        : renderCompanyForm()}

                    <TouchableOpacity
                        disabled={user?.isTermsAndConditionsAgreed ?? false}
                        onPress={() => settermsAccepted(!termsAccepted)}
                        style={styles.termWrapper}>
                        <Image
                            style={[styles.checkIcon, {
                                tintColor: termsAccepted ? colors.white : `${colors.white}40`
                            }]}
                            source={images.icCheckTerm}
                        />
                        <View style={{
                            flexDirection: 'row',
                            width: '80%',
                            flexWrap: 'wrap'
                        }}>
                            <Text style={styles.termText}>
                                {'I agree to all '}
                            </Text>
                            <Text
                                onPress={handleWebViewNavigation(screenName.webViewScreen, 'Terms And Conditions', apiConfig.terms)}
                                style={[styles.termText, {
                                    textDecorationLine: 'underline'
                                }]}>
                                Terms And Conditions
                            </Text>
                            <Text style={styles.termText}>
                                {' and '}
                            </Text>
                            <Text
                                onPress={handleWebViewNavigation(screenName.webViewScreen, 'Privay Policy', apiConfig.privacyPolicy)}
                                style={[styles.termText, {
                                    textDecorationLine: 'underline'
                                }]}>
                                privay Policy
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        style={styles.buttonWrapper}>
                        <Image
                            style={styles.buttonImage}
                            source={images.icNext}
                        />
                    </TouchableOpacity>

                    {!user?._id && <View style={styles.signUpWrapper}>
                        <Text style={styles.signUpText}>
                            Already Have An Account?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate(screenName.login)}>
                            <Text style={[styles.signUpText, {
                                fontFamily: fonts.primaryBold,
                                marginLeft: 4,
                            }]}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>}

                </View>
            </KeyboardAwareScrollView>

        </View >
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.primary
    },
    bgImage: {
        height: '100%',
        width: '100%',
    },
    logoBanner: {
        height: 150,
        width: '40%',
        resizeMode: 'contain',
        marginTop: '5%',
        alignSelf: 'center'
    },
    formWrapper: {
        flex: 1,
        paddingTop: '3%',
        paddingHorizontal: '8%',
        alignItems: 'center'
    },
    fieldHeading: {
        fontSize: 13,
        fontFamily: fonts.primaryBold,
        color: colors.white,
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
    horizontalWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%'
    },
    horizontalItem: {
        width: '47%',
    },
    termText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: colors.white,
    },
    buttonWrapper: {
        alignSelf: 'flex-end',
        marginVertical: '5%'
    },
    buttonImage: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
    signUpWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    signUpText: {
        fontSize: 13,
        fontFamily: fonts.primaryRegular,
        color: colors.white
    },
    termWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginTop: '3%',
    },
    checkIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginRight: '2%'
    }
})