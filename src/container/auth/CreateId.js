import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import { StepCounter } from '../../components/atoms'
import { FieldInput, FieldSelect, PhoneFieldInput } from '../../components/formComponents'
import { MultiSelect } from '../../components/molecules'
import { Header } from '../../components/molecules/Header'
import { MyImagePicker } from '../../components/molecules/MyImagePicker'
import { Request } from '../../services'
import { updateProfileRequest } from '../../store/modules/profile/actions'
import { apiConfig, apiSuccess, colors, convertToFormData, errorToast, fonts, images, screenName, statusStrings, validation } from '../../utils'

export const CreateId = ({ navigation, route }) => {

    // ************* Hooks Functions ************* //

    const {
        accountType,
        flowProfile,
    } = route?.params;

    const dispatch = useDispatch()

    const user = useSelector(state => state.loginReducer.loginData)

    const { control,
        handleSubmit,
        errors,
        setValue
    } = useForm({ mode: 'all' });

    const [individualData, setIndividualData] = useState({
        isCitizenOfGhana: '',
        citizenArray: ['Yes', 'No'],
        governmentIdFile: null,
    })

    const [companyData, setCompanyData] = useState({
        businessRegistrationCertificate: null,
        tradeAreaList: [],
        tradeArea: '',
    })

    useEffect(() => {
        getTradeData()
        if (user?._id) {
            Object.entries(user).map(([key, value]) => {
                setValue(key, `${value}`)
            });

            if (user?.accountType === statusStrings.individual) {
                setIndividualData(data => ({
                    ...data,
                    governmentIdFile: {
                        uri: user?.governmentIdFile
                    },
                    isCitizenOfGhana: user?.isCitizenOfGhana === 'no' ? 'No' : 'Yes',
                }))
            }


            if (user?.accountType === statusStrings.company) {
                setCompanyData(data => ({
                    ...data,
                    businessRegistrationCertificate: {
                        uri: user?.businessRegistrationCertificate
                    },
                    tradeArea: user?.tradeArea.toString(),
                }))
            }

        }
    }, [])

    // ************** Main Functions **************** //

    const getTradeData = async () => {
        try {
            const response = await Request.post(
                apiConfig.tradeArea,
            );
            console.log('response', response)
            if (response.status == apiSuccess) {
                const newArray = response.data.map(item => ({
                    ...item,
                    label: item?.subcatName
                }))
                console.log('n=', newArray)
                setCompanyData(data => ({
                    ...data,
                    tradeAreaList: newArray
                }))
            } else {
                errorToast(response.message)
            }
        } catch (error) {
            console.log('API ERROR', error)
        }
    }

    const validateForm = () => {
        if (accountType == 'individual') {
            if (individualData.isCitizenOfGhana === '') {
                errorToast('Please select your citizenship')
                return false
            } else if (individualData.governmentIdFile === null) {
                errorToast('Please upload id')
                return false
            } else {
                return true
            }
        } else {
            if (companyData.tradeArea === '') {
                errorToast('Please select trade area')
                return false
            } else if (individualData.businessRegistrationCertificate === null) {
                errorToast('Please upload Business Registration Certificate')
                return false
            } else {
                return true
            }
        }
    }

    const onSubmit = formValues => {
        console.log(formValues)
        if (validateForm()) {
            if (accountType == 'individual') {
                if (flowProfile) {
                    const formData = convertToFormData({
                        ...formValues,
                        isCitizenOfGhana: individualData.isCitizenOfGhana.toLowerCase(),
                        governmentIdFile: individualData?.governmentIdFile?.type
                            ? individualData?.governmentIdFile
                            : individualData?.governmentIdFile?.uri
                    })
                    dispatch(updateProfileRequest(formData, navigation))
                } else {
                    const payload = {
                        ...formValues,
                        isCitizenOfGhana: individualData.isCitizenOfGhana.toLowerCase(),
                        governmentIdFile: individualData.governmentIdFile
                    }
                    navigation.navigate(screenName.createTradeArea, {
                        ...route?.params,
                        ...payload
                    })
                }
            } else {
                if (flowProfile) {
                    const formData = convertToFormData({
                        ...formValues,
                        businessRegistrationCertificate: companyData?.businessRegistrationCertificate?.type
                            ? companyData?.businessRegistrationCertificate
                            : companyData?.businessRegistrationCertificate?.uri,
                        tradeArea: companyData?.tradeArea,
                    })
                    dispatch(updateProfileRequest(formData, navigation))
                } else {
                    const payload = {
                        ...formValues,
                        businessRegistrationCertificate: companyData.businessRegistrationCertificate,
                        tradeArea: companyData.tradeArea
                    }
                    navigation.navigate(screenName.createTradeArea, {
                        ...route?.params,
                        ...payload
                    })
                }
            }
        }
    }

    // ************** Render Individual Form **************** //

    const renderIndividualForm = () => {
        return (
            <>
                <Text style={[styles.fieldHeading, {
                    fontSize: 15
                }]}>
                    ID & Legal
                </Text>

                <Text style={styles.fieldHeading}>
                    Are you a citizen of Ghana?
                </Text>

                <View style={styles.radioWrapper}>
                    {individualData?.citizenArray.map(item => <TouchableOpacity
                        onPress={() => setIndividualData(data => ({
                            ...data,
                            isCitizenOfGhana: item
                        }))}
                        style={styles.radioItem}>
                        <View style={styles.radioBorder}>
                            <View style={[styles.radioFill, {
                                backgroundColor: individualData.isCitizenOfGhana === item
                                    ? colors.white
                                    : colors.transparent
                            }]} />
                        </View>
                        <Text style={styles.fieldHeading}>
                            {item}
                        </Text>
                    </TouchableOpacity>)}
                </View>
                <Text style={styles.fieldHeading}>
                    Upload copy of your Government-Issued ID
                </Text>

                <Text style={styles.fieldHeading}>
                    ID type
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.required}
                    name='governmentIdType'
                    msg={errors?.governmentIdType?.message}
                />

                <Text style={styles.fieldHeading}>
                    ID number
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.required}
                    name='governmentIdNumber'
                    msg={errors?.governmentIdNumber?.message}
                />

                <Text style={styles.fieldHeading}>
                    Upload ID
                </Text>
                <View style={styles.handleImagePicker}>
                    <MyImagePicker
                        onChange={(src) => setIndividualData(data => ({
                            ...data,
                            governmentIdFile: src
                        }))}
                        style={styles.uploadIdWrapper}
                    >
                        <Image
                            style={individualData?.governmentIdFile
                                ? styles.idImageStyle
                                : styles.imagePlaceholder}
                            source={individualData?.governmentIdFile !== null
                                ? { uri: individualData?.governmentIdFile?.uri }
                                : images.icPlaceholder}
                        />
                    </MyImagePicker>
                </View>

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
                    Legal
                </Text>
                <Text style={[styles.fieldHeading, {
                    fontSize: 11,
                    width: '85%'
                }]}>
                    Upload copy of your Business Registration Certificate ( certificate of Incorporation from The Registrar General’s Department)
                </Text>
                <View style={styles.handleImagePicker}>
                    <MyImagePicker
                        onChange={(src) => setCompanyData(data => ({
                            ...data,
                            businessRegistrationCertificate: src
                        }))}
                        style={styles.uploadIdWrapper}>
                        <Image
                            style={companyData?.businessRegistrationCertificate
                                ? styles.idImageStyle
                                : styles.imagePlaceholder}
                            source={companyData?.businessRegistrationCertificate !== null
                                ? { uri: companyData?.businessRegistrationCertificate?.uri }
                                : images.icPlaceholder}
                        />
                    </MyImagePicker>
                </View>

                <Text style={[styles.fieldHeading, {
                    fontSize: 15,
                    marginTop: '8%'
                }]}>
                    Trade area
                </Text>

                <Text style={styles.fieldHeading}>
                    Select trade area (Select all that apply)
                </Text>
                <MultiSelect
                    initialValue={user?.tradeArea}
                    data={companyData?.tradeAreaList}
                    value={companyData.tradeArea}
                    inputStyle={styles.inputStyleMulti}
                    iconRight={images.icDropDown}
                    onChange={tradeArea => setCompanyData(data => ({
                        ...data,
                        tradeArea
                    }))}
                />

                <Text style={styles.fieldHeading}>
                    Years of experience
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.required}
                    maxLength={2}
                    keyboardType='number-pad'
                    name='experience'
                    msg={errors?.experience?.message}
                />

                <Text style={[styles.fieldHeading, {
                    fontSize: 15,
                    marginTop: '8%'
                }]}>
                    Professional asssociations
                </Text>
                <Text style={[styles.fieldHeading, {
                    fontSize: 11,
                    width: '85%'
                }]}>
                    List any Professional Association you belong to.
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.required}
                    name='professionalAssociations'
                    msg={errors?.professionalAssociations?.message}
                />
            </>
        )
    }

    return (
        <View style={styles.mainView}>
            <SafeAreaView />
            <Header
                back
                title={accountType == 'individual' ? 'ID & Legal' : 'Legal & Trade Area'}
                borderRound
            />
            <KeyboardAwareScrollView>

                <StepCounter
                    isCompany={accountType !== "individual"}
                    showIndicator
                    stepValue={3}
                />

                <View style={styles.formWrapper}>

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
    radioWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '3%',
        width: '100%'
    },
    radioItem: {
        width: '35%',
        alignItems: 'center',
        flexDirection: 'row',
    },
    radioBorder: {
        height: 16,
        width: 16,
        borderRadius: 8,
        borderWidth: .5,
        marginRight: 5,
        borderColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioFill: {
        width: 10,
        height: 10,
        borderRadius: 5,
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
    inputStyleMulti: {
        fontFamily: fonts.primaryRegular,
        fontSize: 13,
        color: colors.textGrey,
        width: '85%'
    },
    handleImagePicker: {
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 8
    },
    uploadIdWrapper: {
        height: 80,
        width: 80,
        borderRadius: 5,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    imagePlaceholder: {
        height: 40,
        width: 40,
        resizeMode: 'contain'
    },
    idImageStyle: {
        height: '100%',
        width: '100%',
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