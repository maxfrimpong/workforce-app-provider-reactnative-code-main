import AsyncStorage from '@react-native-async-storage/async-storage'
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
import { Header } from '../../components/molecules/Header'
import { MyImagePicker } from '../../components/molecules/MyImagePicker'
import { Request } from '../../services'
import { updateProfileRequest } from '../../store/modules/profile/actions'
import { registerRequest } from '../../store/modules/register/actions'
import { apiConfig, apiSuccess, colors, convertToFormData, errorToast, fonts, images, screenName, statusStrings, validation } from '../../utils'

export const CreateTradeArea = ({ navigation, route }) => {

    // ************* Hooks Functions ************* //

    const dispatch = useDispatch()

    const user = useSelector(state => state.loginReducer.loginData)

    const {
        accountType,
        flowProfile,
    } = route?.params;

    const { control,
        handleSubmit,
        errors,
        setValue,
        getValues,
    } = useForm({ mode: 'all' });

    const [individualData, setIndividualData] = useState({
        booleanArray: ['Yes', 'No'],
        tradeAreaList: [],
        isWorkedForSimilarCompany: '',
    })

    const [companyData, setCompanyData] = useState({
        portfolio: []
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
                    isWorkedForSimilarCompany: user?.isWorkedForSimilarCompany === 'no' ? 'No' : 'Yes'
                }))
            }
            if (user?.accountType === statusStrings.company) {
                setCompanyData(data => ({
                    ...data,
                    portfolio: user?.portFolioImages
                }))
            }
        }

    }, [])

    useEffect(() => {
        if (user?.accountType === statusStrings.individual) {
            setValue('tradeAreaRef', user?.tradeAreaRef[0]?._id)
        }
    }, [individualData?.tradeAreaList])

    // ************** Main Functions **************** //

    const getTradeData = async () => {
        try {
            const response = await Request.post(
                apiConfig.tradeArea,
            );
            console.log('response', response)
            if (response.status == apiSuccess) {
                const newArray = response.data.map(item => ({
                    label: item.subcatName,
                    value: item._id
                }))
                console.log('n=', newArray)
                setIndividualData(data => ({
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
            if (individualData.isWorkedForSimilarCompany === '') {
                errorToast(`Have you worked for a similar comapany. Please select 'Yes' or 'No'`)
                return false
            } else {
                return true
            }
        } else {
            if (companyData.portfolio.length === 0) {
                errorToast('Please Upload your work images')
                return false
            } else {
                return true
            }
        }
    }

    const onSubmit = async formValues => {
        if (validateForm()) {
            if (accountType == 'individual') {
                let tradeArea = '';
                individualData.tradeAreaList.map(item => item?.value === formValues.tradeAreaRef
                    ? tradeArea = item?.label : null
                )
                if (flowProfile) {
                    const formData = convertToFormData({
                        ...formValues,
                        isWorkedForSimilarCompany: individualData.isWorkedForSimilarCompany.toLowerCase(),
                        tradeArea,
                    })
                    companyData.portfolio.map(item => {
                        formData.append('portFolioImages', item)
                    })
                    dispatch(updateProfileRequest(formData, navigation))
                } else {
                    const payload = {
                        ...formValues,
                        isWorkedForSimilarCompany: individualData.isWorkedForSimilarCompany.toLowerCase(),
                        tradeArea,
                        ...route?.params,
                    }
                    console.log('object', payload)
                    navigation.navigate(screenName.qualifications, {
                        ...route?.params,
                        ...payload
                    })
                }
            } else {
                if (flowProfile) {
                    const formData = convertToFormData(formValues)
                    companyData.portfolio.map(item => {
                        formData.append('portFolioImages', item)
                    })
                    dispatch(updateProfileRequest(formData, navigation))
                } else {
                    const firebaseToken = await AsyncStorage.getItem('fcmToken');
                    console.log('company final step', formValues, companyData?.portfolio, route?.params)
                    let payload = {
                        ...route.params,
                        ...formValues,
                        firebaseToken,
                    }
                    delete payload.flowProfile;
                    let formData = convertToFormData(payload)
                    companyData.portfolio.map(item => {
                        formData.append('portFolioImages', item)
                    })
                    dispatch(registerRequest(formData, navigation))
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
                    Trade area
                </Text>

                <Text style={styles.fieldHeading}>
                    Select trade area
                </Text>
                <FieldSelect
                    items={individualData.tradeAreaList}
                    control={control}
                    inputViewStyle={styles.inputViewStyle}
                    rules={validation.required}
                    name='tradeAreaRef'
                    msg={errors?.tradeAreaRef?.message}
                    iconRight={images.icDropDown}
                />

                <Text style={styles.fieldHeading}>
                    Years of Experience
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

                <Text style={styles.fieldHeading}>
                    Have you ever worked for a similar company?
                </Text>

                <View style={styles.radioWrapper}>
                    {individualData?.booleanArray.map(item => <TouchableOpacity
                        onPress={() => setIndividualData(data => ({
                            ...data,
                            isWorkedForSimilarCompany: item
                        }))}
                        style={styles.radioItem}>
                        <View style={styles.radioBorder}>
                            <View style={[styles.radioFill, {
                                backgroundColor: individualData.isWorkedForSimilarCompany === item
                                    ? colors.white
                                    : colors.transparent
                            }]} />
                        </View>
                        <Text style={styles.fieldHeading}>
                            {item}
                        </Text>
                    </TouchableOpacity>)}
                </View>

                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={[styles.inputViewStyle, {
                        height: 100,
                        alignItems: 'flex-start',
                        marginTop: 10
                    }]}
                    multiline={true}
                    rules={individualData?.isWorkedForSimilarCompany == 'Yes' ? validation.required : null}
                    placeholder='Write here...'
                    name='isWorkedForSimilarCompanyDescription'
                    msg={errors?.isWorkedForSimilarCompanyDescription?.message}
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
                    Portfolio
                </Text>
                <Text style={[styles.fieldHeading, {
                    fontSize: 13
                }]}>
                    Describe some of Your previous work done
                </Text>
                <FieldInput
                    control={control}
                    inputStyle={styles.inputStyle}
                    inputViewStyle={[styles.inputViewStyle, {
                        height: 100,
                        alignItems: 'flex-start',
                        paddingVertical: 5
                    }]}
                    rules={validation.required}
                    placeholder='Enter Details Here'
                    name='portFolioDescription'
                    multiline={true}
                    msg={errors?.portFolioDescription?.message}
                />
                <Text style={[styles.fieldHeading, {
                    fontSize: 13
                }]}>
                    Upload photos of your work
                </Text>
                <View style={styles.handleImagePicker2}>
                    {companyData?.portfolio.map((item, index) => <Image
                        style={styles.uploadIdWrapper}
                        source={{ uri: item?.uri ?? item }}
                    />)}
                    {companyData?.portfolio.length < 5 && <MyImagePicker
                        onChange={src => setCompanyData(data => ({
                            ...data,
                            portfolio: [...data.portfolio, src]
                        }))}
                        style={styles.uploadIdWrapper}>
                        <Image
                            style={styles.imagePlaceholder}
                            source={images.icPlaceholder}
                        />
                    </MyImagePicker>}
                </View>
            </>
        )
    }

    return (
        <View style={styles.mainView}>
            <SafeAreaView />
            <Header
                back
                title={accountType == 'individual' ? 'Add Trade Area' : 'Portfolio'}
                borderRound
            />
            <KeyboardAwareScrollView>

                <StepCounter
                    isCompany={accountType !== "individual"}
                    showIndicator
                    stepValue={4}
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
    handleImagePicker: {
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 8
    },
    handleImagePicker2: {
        width: '100%',
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    uploadIdWrapper: {
        height: 80,
        width: 80,
        borderRadius: 5,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginTop: 8,
        marginRight: 8
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