import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    TextInput,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import { StepCounter } from '../../components/atoms'
import { Header } from '../../components/molecules/Header'
import { MyImagePicker } from '../../components/molecules/MyImagePicker'
import { updateProfileRequest } from '../../store/modules/profile/actions'
import { colors, convertToFormData, errorToast, fonts, images, screenName } from '../../utils'

export const Qualifications = ({ navigation, route }) => {

    // *********** Hooks Functions ************* //

    const dispatch = useDispatch()

    const user = useSelector(state => state.loginReducer.loginData)

    const {
        flowProfile
    } = route.params;


    const [schoolTraning, setSchoolTraning] = useState({
        listData: [],
        inputValue: '',
        image: null
    })

    const [appreticeship, setAppreticeship] = useState({
        listData: [],
        inputValue: '',
        image: null
    })

    const [proQualification, setProQualification] = useState({
        listData: [],
        inputValue: '',
        image: null
    })

    const qualificationArray = [
        {
            title: 'School/TVET training (If any)',
            ...schoolTraning
        },
        {
            title: 'Appreticeships undertaken (If any)',
            ...appreticeship
        },
        {
            title: 'List all certifications and \nprofessional qualificatons (If any)',
            ...proQualification
        }
    ]

    const [portfolio, setPortfolio] = useState([])

    useEffect(() => {
        if (user?._id && flowProfile) {
            setPortfolio(user?.portFolioImages)
            // Handle School Data
            const newSchoolArray = user?.schoolTraining.map(item => ({
                ...item,
                image: item?.schoolTrainingImage
            }))
            setSchoolTraning(data => ({
                ...data,
                listData: newSchoolArray
            }))
            // Handle apprenticeship Data
            const newApprenticeshipArray = user?.apprenticeship.map(item => ({
                ...item,
                image: item?.apprenticeshipImage
            }))
            setAppreticeship(data => ({
                ...data,
                listData: newApprenticeshipArray
            }))
            // Handle Professional Data
            const newProArray = user?.professionalQualification.map(item => ({
                ...item,
                image: item?.professionalQualificationImage
            }))
            setProQualification(data => ({
                ...data,
                listData: newProArray
            }))
        }
    }, [])

    // ************* Main Functions ************** //

    const validateAddMore = (data) => {
        console.log(data)
        if (data.inputValue == '' || data.image == null) {
            errorToast('Please add all the details of active field first.')
            return false
        } else {
            return true
        }
    }

    const changeTextMapper = {
        0: (inputValue) => setSchoolTraning(data => ({
            ...data,
            inputValue
        })),
        1: (inputValue) => setAppreticeship(data => ({
            ...data,
            inputValue
        })),
        2: (inputValue) => setProQualification(data => ({
            ...data,
            inputValue
        })),
    }

    const changeImageMapper = {
        0: (image) => setSchoolTraning(data => ({
            ...data,
            image
        })),
        1: (image) => setAppreticeship(data => ({
            ...data,
            image
        })),
        2: (image) => setProQualification(data => ({
            ...data,
            image
        })),
    }

    const addMoreMapper = {
        0: () => validateAddMore(schoolTraning) ? setSchoolTraning(data => ({
            ...data,
            listData: [...data.listData, {
                title: data.inputValue,
                image: data.image,
            }],
            inputValue: '',
            image: null,
        })) : null,
        1: () => validateAddMore(appreticeship) ? setAppreticeship(data => ({
            ...data,
            listData: [...data.listData, {
                title: data.inputValue,
                image: data.image,
            }],
            inputValue: '',
            image: null,
        })) : null,
        2: () => validateAddMore(proQualification) ? setProQualification(data => ({
            ...data,
            listData: [...data.listData, {
                title: data.inputValue,
                image: data.image,
            }],
            inputValue: '',
            image: null,
        })) : null,
    }

    const validateForm = () => {
        if (portfolio.length === 0) {
            errorToast('Please upload photos of your work')
            return false
        } else if (
            (schoolTraning.inputValue !== '' && schoolTraning.image == null) ||
            (schoolTraning.inputValue == '' && schoolTraning.image !== null)
        ) {
            errorToast('Please add all the details of School/TVET training active field first.')
            return false
        } else if (
            (appreticeship.inputValue !== '' && appreticeship.image == null) ||
            (appreticeship.inputValue == '' && appreticeship.image !== null)
        ) {
            errorToast('Please add all the details of Appreticeship active field first.')
            return false
        } else if (
            (proQualification.inputValue !== '' && proQualification.image == null) ||
            (proQualification.inputValue == '' && proQualification.image !== null)
        ) {
            errorToast('Please add all the details of Professional Qualification active field first.')
            return false
        } else {
            return true
        }
    }

    const createPayload = () => {
        let payload = route.params;
        delete payload.flowProfile;
        delete payload.confirmPassword;
        let formData = flowProfile ? new FormData() : convertToFormData(payload)

        let schoolTrainingString = '';
        let appreticeshipString = '';
        let proQualificationString = '';

        // Porfolio images
        portfolio.map((item) => { if (item?.uri) { formData.append(`portFolioImages`, item) } }
        )

        // School certificates
        schoolTraning.listData.map((item, index) => {
            if (item?.image?.uri) {
                schoolTrainingString = `${schoolTrainingString}${schoolTrainingString !== '' ? ',' : ''}${item.title}`
                formData.append(`schoolTrainingImage`, item.image)
            }
        })
        if (schoolTraning.image !== null && schoolTraning.inputValue !== '') {
            schoolTrainingString = `${schoolTrainingString}${schoolTrainingString !== '' ? ',' : ''}${schoolTraning.inputValue}`
            formData.append(`schoolTrainingImage`, schoolTraning.image)
        }

        // Appreticeship Certificates
        appreticeship.listData.map((item, index) => {
            if (item?.image?.uri) {
                appreticeshipString = `${appreticeshipString}${appreticeshipString !== '' ? ',' : ''}${item.title}`
                formData.append(`apprenticeshipImage`, item.image)
            }
        })
        if (appreticeship.image !== null && appreticeship.inputValue !== '') {
            appreticeshipString = `${appreticeshipString}${appreticeshipString !== '' ? ',' : ''}${appreticeship.inputValue}`
            formData.append(`apprenticeshipImage`, appreticeship.image)
        }

        // Professional Qualification Certificates
        proQualification.listData.map((item, index) => {
            if (item?.image?.uri) {
                proQualificationString = `${proQualificationString}${proQualificationString !== '' ? ',' : ''}${item.title}`
                formData.append(`professionalQualificationImage`, item.image)
            }
        })
        if (proQualification.image !== null && proQualification.inputValue !== '') {
            proQualificationString = `${proQualificationString}${proQualificationString !== '' ? ',' : ''}${proQualification.inputValue}`
            formData.append(`professionalQualificationImage`, proQualification.image)
        }
        if (schoolTrainingString !== '') { formData.append('schoolTraining', schoolTrainingString) }
        if (appreticeshipString !== '') { formData.append('apprenticeship', appreticeshipString) }
        if (proQualificationString !== '') { formData.append('professionalQualification', proQualificationString) }
        console.log('Payload', formData)
        return formData
    }

    const onSubmit = () => {
        if (validateForm()) {
            const qualifications = createPayload()
            console.log('QatData', qualifications)
            if (flowProfile) {
                dispatch(updateProfileRequest(qualifications, navigation))
            } else {
                navigation.navigate(screenName.security, {
                    flowProfile: false,
                    passedData: qualifications,
                })
            }
        }
    }

    return (
        <View style={styles.mainView}>
            <SafeAreaView />
            <Header
                back
                title='Qualifications'
                borderRound
            />

            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
            >

                <StepCounter
                    showIndicator
                    stepValue={5}
                />

                <View style={styles.formWrapper}>

                    <Text style={[styles.fieldHeading, {
                        fontSize: 15
                    }]}>
                        Qualifications
                    </Text>

                    {/* Render Upload Certificates nested array loop */}
                    {
                        qualificationArray.map((item, index) =>
                            <View style={styles.itemImage} >
                                <Text style={styles.fieldHeading}>
                                    {item.title}
                                </Text>

                                <View style={styles.horizontalView}>
                                    <View style={styles.inputViewStyle}>
                                        <TextInput
                                            style={styles.inputStyle}
                                            value={item.inputValue}
                                            onChangeText={txt => changeTextMapper[index](txt)}
                                        />
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => addMoreMapper[index]()}
                                    >
                                        <Image
                                            style={styles.addIcon}
                                            source={images.icAdd}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <MyImagePicker
                                    onChange={src => changeImageMapper[index](src)}
                                    style={styles.uploadView}>
                                    <Image
                                        style={styles.imageUpload}
                                        source={images.icImageUpload}
                                    />
                                    <Text style={styles.certificateText}>
                                        Upload copy of all certificates
                                    </Text>
                                </MyImagePicker>
                                {item?.image && <Image
                                    style={styles.sourceImage}
                                    source={{ uri: item?.image?.uri }}
                                />}

                                {item?.listData.length > 0 && <View style={styles.certificateWrapper}>
                                    {item?.listData.map((listItem, listIndex) =>
                                        <View style={styles.certificateItem}>
                                            <Text style={styles.certificateMainText}
                                                numberOfLines={1}>
                                                {listIndex + 1}. {listItem?.title}
                                            </Text>
                                            <Text
                                                style={styles.certificateImageText}
                                                numberOfLines={1}>
                                                {listItem?.image?.uri ?? listItem?.image}
                                            </Text>
                                        </View>)
                                    }
                                </View>}
                            </View>)
                    }

                    <Text style={[styles.fieldHeading, {
                        marginTop: '8%'
                    }]}>
                        Upload  photos of your work
                    </Text>

                    <View style={styles.handleImagePicker}>
                        {portfolio.map((item, index) => <Image
                            style={styles.uploadIdWrapper}
                            source={{ uri: item?.uri ?? item }}
                        />)}
                        {portfolio.length < 5 && <MyImagePicker
                            onChange={src => setPortfolio(data => ([
                                ...data,
                                src
                            ]))}
                            style={styles.uploadIdWrapper}>
                            <Image
                                style={styles.imagePlaceholder}
                                source={images.icPlaceholder}
                            />
                        </MyImagePicker>}
                    </View>

                    <TouchableOpacity
                        onPress={onSubmit}
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
    },
    fieldHeading: {
        fontSize: 13,
        fontFamily: fonts.primaryBold,
        color: colors.white,
        alignSelf: 'flex-start',
        marginTop: '3%'
    },
    horizontalView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputViewStyle: {
        width: '80%',
        borderColor: colors.border,
        borderWidth: .5,
        marginTop: '2%',
        marginBottom: '2%',
        paddingHorizontal: '5%',
        backgroundColor: colors.inputBackground,
        borderRadius: 10
    },
    addIcon: {
        height: 38,
        width: 38,
        resizeMode: 'contain',
        tintColor: colors.white,
        marginLeft: '3%'
    },
    imageUpload: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
        marginRight: 5
    },
    uploadView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '3%',
    },
    certificateText: {
        fontFamily: fonts.primaryBold,
        fontSize: 12,
        color: colors.white,
    },
    itemImage: {
        marginTop: '5%',
    },
    inputStyle: {
        fontFamily: fonts.primaryRegular,
        fontSize: 13,
        color: colors.textGrey,
        padding: 0,
        width: '100%',
        height: 40,
    },
    handleImagePicker: {
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
    sourceImage: {
        height: 50,
        width: 80,
        borderRadius: 5,
        marginLeft: '5%',
        marginTop: 5
    },
    certificateWrapper: {
        marginTop: 5,
        backgroundColor: colors.white,
        borderRadius: 5,
        paddingHorizontal: '5%',
        paddingVertical: '2%'
    },
    certificateItem: {
        paddingVertical: 5,
        borderBottomWidth: .5,
        borderColor: colors.circleBorder
    },
    certificateMainText: {
        fontFamily: fonts.primaryBold,
        fontSize: 12,
        color: colors.textLightBlack
    },
    certificateImageText: {
        fontFamily: fonts.primaryLight,
        fontSize: 12,
        color: colors.textLightBlack
    }
})

