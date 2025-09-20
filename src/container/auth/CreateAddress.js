import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    SafeAreaView,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import { StepCounter } from '../../components/atoms'
import { FieldInput, FieldPlaces, PhoneFieldInput } from '../../components/formComponents'
import { country } from '../../components/formComponents/country'
import { MultiSelect } from '../../components/molecules'
import { Header } from '../../components/molecules/Header'
import { Request } from '../../services'
import { updateProfileRequest } from '../../store/modules/profile/actions'
import { apiConfig, apiSuccess, colors, convertToFormData, errorToast, fonts, images, screenName, statusStrings, validation } from '../../utils'

export const CreateAddress = ({ navigation, route }) => {

    // ************* Hooks Functions ************* //

    const {
        accountType,
        flowProfile
    } = route?.params;

    const { control,
        handleSubmit,
        errors,
        setValue,
    } = useForm({ mode: 'all' });

    const dispatch = useDispatch()

    const user = useSelector(state => state.loginReducer.loginData)

    const [countryData, setcountryData] = useState({
        phoneCode: '+233',
        flag: '🇬🇭',
    })

    const [countryWorkData, setcountryWorkData] = useState({
        phoneCode: '+233',
        flag: '🇬🇭',
    })

    const [addressData, setAddressData] = useState({
        regionData: [],
        regions: ''
    })

    useEffect(() => {
        getRegions()
        if (route?.params?.countryCode && route?.params?.mobileNumber) {
            setValue('mobileNumber', route?.params?.mobileNumber)
            country.forEach(item => item?.dialCode === route?.params?.countryCode
                ? setcountryData({
                    phoneCode: item?.dialCode,
                    flag: item?.emoji,
                }) : null)
        }
    }, [])

    // Handle data setup for profile

    useEffect(() => {
        if (user?._id) {
            Object.entries(user).map(([key, value]) => {
                setValue(key, value)
            });
            country.forEach(item => item?.dialCode === user?.countryCode
                ? setcountryData({
                    phoneCode: item?.dialCode,
                    flag: item?.emoji,
                }) : null)
            setValue('address', {
                name: user?.address,
                location: {
                    latitude: user?.driverLocation?.coordinates[1],
                    longitude: user?.driverLocation?.coordinates[0],
                },
            })
            setAddressData(data => ({
                ...data,
                regions: user?.selectedRegions.toString()
            }))
            if (user?.accountType === statusStrings.company) {
                if (user?.workCountryCode) {
                    country.forEach(item => item?.dialCode === user?.workCountryCode
                        ? setcountryWorkData({
                            phoneCode: item?.dialCode,
                            flag: item?.emoji,
                        }) : null)
                }
            }
        }
    }, [])


    // ************* Main Functions ************* //

    const getRegions = async () => {
        try {
            const response = await Request.get(
                apiConfig.region,
            );
            console.log('response', response)
            if (response.status == apiSuccess) {
                setAddressData(data => ({
                    ...data,
                    regionData: response?.data.map(item => ({
                        ...item,
                        label: item?.regionName
                    }))
                }))
            } else {
                errorToast(response.message)
            }
        } catch (error) {
            console.log('API ERROR', error)
        }
    }

    const onSubmit = formValues => {
        console.log(formValues)
        let payload = {
            ...formValues,
            lat: formValues.address.location.latitude,
            lng: formValues.address.location.longitude,
            address: formValues.address.name
        }
        formValues?.workNumber ? payload['workCountryCode'] = countryWorkData?.phoneCode : null;
        formValues?.mobileNumber ? payload['countryCode'] = countryData?.phoneCode : null;
        console.log(payload)

        if (flowProfile) {
            const formData = convertToFormData({
                ...payload,
                regions: addressData.regions
            })
            dispatch(updateProfileRequest(formData, navigation))
        } else {
            navigation.navigate(screenName.createId, {
                ...route?.params,
                ...payload,
                regions: addressData.regions
            })
        }
    }

    // ************** Render Individual Form **************** //

    const renderIndividualForm = () => {
        return (
            <>
                <Text style={styles.fieldHeading}>
                    Home address
                </Text>
                <FieldPlaces
                    initialValue={user?.address ?? false}
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.required}
                    name='address'
                    msg={errors?.address?.message}
                    locationType='location'
                    handleLocation={item => setValue('address', item, { shouldValidate: true })}
                />

                <Text style={styles.fieldHeading}>
                    Region
                </Text>
                <MultiSelect
                    initialValue={user?.selectedRegions ?? false}
                    data={addressData.regionData}
                    value={addressData.regions}
                    inputStyle={styles.inputStyleMulti}
                    iconRight={images.icDropDown}
                    onChange={regions => setAddressData(data => ({
                        ...data,
                        regions
                    }))}
                />

                <Text style={styles.fieldHeading}>
                    Email address
                </Text>
                <FieldInput
                    type='email'
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.email}
                    name='email'
                    msg={errors?.email?.message}
                />

                <Text style={styles.fieldHeading}>
                    Mobile number*
                </Text>
                <PhoneFieldInput
                    disable={!flowProfile}
                    control={control}
                    inputStyle={styles.inputStylePhone}
                    inputViewStyle={styles.inputViewStylePhone}
                    rules={validation.phone}
                    name='mobileNumber'
                    msg={errors?.mobileNumber?.message}
                    placeholder={'Enter your mobile number'}
                    flagValue={countryData.flag}
                    countryCode={countryData.phoneCode}
                    onSelectCode={(phoneCode, flag) => setcountryData({ phoneCode, flag })}
                />
            </>
        )
    }

    // ************** Render Comapany Form **************** //

    const renderCompanyForm = () => {
        return (
            <>
                <Text style={styles.fieldHeading}>
                    Company address
                </Text>
                <FieldPlaces
                    initialValue={user?.address ?? false}
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.required}
                    name='address'
                    msg={errors?.address?.message}
                    locationType='location'
                    handleLocation={item => setValue('address', item, { shouldValidate: true })}
                />

                <Text style={styles.fieldHeading}>
                    Region
                </Text>
                <MultiSelect
                    initialValue={user?.selectedRegions ?? false}
                    data={addressData.regionData}
                    value={addressData.regions}
                    inputStyle={styles.inputStyleMulti}
                    iconRight={images.icDropDown}
                    onChange={regions => setAddressData(data => ({
                        ...data,
                        regions
                    }))}
                />

                <Text style={styles.fieldHeading}>
                    Email address
                </Text>
                <FieldInput
                    type='email'
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.email}
                    name='email'
                    msg={errors?.email?.message}
                />

                <Text style={styles.fieldHeading}>
                    Mobile number*
                </Text>
                <PhoneFieldInput
                    disable={!flowProfile}
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

                <Text style={styles.fieldHeading}>
                    Work number (If any)
                </Text>
                <PhoneFieldInput
                    control={control}
                    inputStyle={styles.inputStylePhone}
                    inputViewStyle={styles.inputViewStylePhone}
                    name='workNumber'
                    msg={errors?.workNumber?.message}
                    placeholder={'Enter Your Mobile Number'}
                    flagValue={countryWorkData.flag}
                    countryCode={countryWorkData.phoneCode}
                    onSelectCode={(phoneCode, flag) => setcountryWorkData({ phoneCode, flag })}
                />
            </>
        )
    }

    return (
        <View style={styles.mainView}>
            <SafeAreaView />
            <Header
                back
                title='Address'
                borderRound
            />
            <KeyboardAwareScrollView>

                <StepCounter
                    isCompany={accountType !== "individual"}
                    showIndicator
                    stepValue={2}
                />

                <View style={styles.formWrapper}>

                    <Text style={[styles.fieldHeading, {
                        fontSize: 15
                    }]}>
                        Address
                    </Text>

                    {accountType == 'individual'
                        ? renderIndividualForm()
                        : renderCompanyForm()}

                    <TouchableOpacity
                        onPress={handleSubmit(onSubmit)}
                        style={styles.buttonWrapper}>
                        <Image
                            style={styles.buttonImage}
                            source={images.icNext}
                        />
                    </TouchableOpacity>



                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.primary,
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
        fontSize: 13,
        color: colors.textGrey,
        padding: 0,
        paddingLeft: 10,
        width: '80%',
        height: 45,
    },
    inputStyleMulti: {
        fontFamily: fonts.primaryRegular,
        fontSize: 13,
        color: colors.textGrey,
        width: '85%'
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
        fontSize: 13,
        borderColor: colors.textGrey,
        width: '80%',
        height: 45,
        padding: 0
    },
    buttonWrapper: {
        alignSelf: 'flex-end',
        marginVertical: '10%'
    },
    buttonImage: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
})