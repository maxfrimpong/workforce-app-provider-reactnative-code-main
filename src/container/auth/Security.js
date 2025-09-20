import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch, useSelector } from 'react-redux'
import { StepCounter } from '../../components/atoms'
import { Header } from '../../components/molecules/Header'
import { MyImagePicker } from '../../components/molecules/MyImagePicker'
import { updateProfileRequest } from '../../store/modules/profile/actions'
import { registerRequest } from '../../store/modules/register/actions'
import { colors, convertToFormData, fonts, images, screenName } from '../../utils'

export const Security = ({ navigation, route }) => {

    // ************ Hooks Functions ************* //

    const dispatch = useDispatch()

    const user = useSelector(state => state.loginReducer.loginData)

    const {
        flowProfile,
        passedData
    } = route.params;

    const securityArray = [
        {
            title: 'Have you ever been arrested / convicted / detained for any offence or crime, even though you are subject to a pardon, amnesty or other similar action?',
            status: ['Yes', 'No'],
            active: flowProfile ? user?.isArrested : 'No',
        },
        {
            title: 'Have you ever been involved in any law-breaking activity?',
            status: ['Yes', 'No'],
            active: flowProfile ? user?.isInvolvedInLawBreakingActivity : 'No',
        },
        {
            title: 'Have you ever operated under a different name, been sued or sued anyone before?',
            status: ['Yes', 'No'],
            active: flowProfile ? user?.isOperatedUnderDifferentName : 'No',
        }
    ]

    const [security, setSecurity] = useState(securityArray)



    const onSubmit = async () => {
        const firebaseToken = await AsyncStorage.getItem('fcmToken');
        let payload = flowProfile ? new FormData : passedData;
        payload.append('isArrested', security[0].active)
        payload.append('isInvolvedInLawBreakingActivity', security[1].active)
        payload.append('isOperatedUnderDifferentName', security[2].active)
        if (flowProfile) {
            dispatch(updateProfileRequest(payload, navigation))
        } else {
            payload.append('firebaseToken', firebaseToken)
            dispatch(registerRequest(payload, navigation))
        }
    }

    return (
        <View style={styles.mainView}>
            <SafeAreaView />
            <Header
                back
                title='Security'
                borderRound
            />

            <KeyboardAwareScrollView>

                <StepCounter
                    showIndicator
                    stepValue={6}
                />

                <View style={styles.formWrapper}>

                    <Text style={[styles.fieldHeading, {
                        fontSize: 15
                    }]}>
                        Security details
                    </Text>

                    <Text style={[styles.fieldHeading, {
                        fontSize: 18
                    }]}>
                        Criminal information
                    </Text>

                    {
                        security.map((item, index) =>
                            <View style={styles.itemImage} >
                                <Text style={[styles.fieldHeading, {
                                    fontFamily: fonts.primarySemibold
                                }]}>
                                    {item.title}
                                </Text>

                                <View style={styles.radioWrapper}>
                                    {item.status.map(it => <TouchableOpacity
                                        onPress={() => {
                                            const newArray = security.map((data, idx) => idx === index ? {
                                                ...data,
                                                active: it
                                            } : data)
                                            setSecurity(newArray)
                                        }}
                                        style={styles.radioItem}>
                                        <View style={styles.radioBorder}>
                                            <View style={[styles.radioFill, {
                                                backgroundColor: item.active === it
                                                    ? colors.white
                                                    : colors.transparent
                                            }]} />
                                        </View>
                                        <Text style={styles.fieldHeading}>
                                            {it}
                                        </Text>
                                    </TouchableOpacity>)}
                                </View>
                            </View>)
                    }

                    <TouchableOpacity
                        onPress={onSubmit}
                        style={styles.buttonWrapper}>
                        <Text style={styles.buttonText}>
                            Submit
                        </Text>
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
        height: 40,
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
    buttonWrapper: {
        width: '100%',
        height: 50,
        marginTop: '10%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.white
    },
    buttonText: {
        fontFamily: fonts.primaryBold,
        fontSize: 18,
        color: colors.primary,
    },
})

