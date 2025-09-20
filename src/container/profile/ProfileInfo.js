import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StyleSheet,

} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import { StepCounter } from '../../components/atoms'
import { Header } from '../../components/molecules/Header'
import { colors, fonts, images, screenName, statusStrings } from '../../utils'

export const ProfileInfo = ({ navigation, route }) => {

    // ************* Hooks Functions *************** //

    const user = useSelector(state => state.loginReducer.loginData)

    const infoArray = [
        {
            title: 'Photograph',
            status: ['Completed', 'Pending'],
            active: user?.profileInformation?.photograph
        },
        {
            title: 'Training',
            status: ['Completed', 'Pending'],
            active: user?.profileInformation?.training
        },
        {
            title: 'Term & Conditions',
            status: ['Completed', 'Pending'],
            active: user?.profileInformation?.termsAndConditions
        },
        {
            title: 'References',
            status: ['Completed', 'Pending'],
            active: user?.profileInformation?.references
        },
        {
            title: 'Payment information',
            status: ['Completed', 'Pending'],
            active: user?.profileInformation?.paymentInformation
        },
        {
            title: 'Health insurance',
            status: ['Completed', 'Pending'],
            active: user?.profileInformation?.healthInsurance
        },
        {
            title: 'Medical exams',
            status: ['Completed', 'Pending'],
            active: user?.profileInformation?.medicalExams
        },
    ]

    return (
        <View style={styles.mainView}>
            <SafeAreaView />
            <Header
                back
                title='Profile Information'
                borderRound
            />

            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
            >

                <StepCounter
                    isCompany={user?.accountType === statusStrings.company}
                    showIndicator
                    stepValue={user?.accountType === statusStrings.company ? 5 : 7}
                />

                <View style={styles.formWrapper}>
                    {infoArray.map((item, index) =>
                        <View style={[styles.itemImage, {
                            borderBottomWidth: index === 6 ? 0 : .5,
                        }]} >
                            <Text style={styles.fieldHeading}>
                                {item.title}
                            </Text>

                            <View style={styles.radioWrapper}>
                                {item.status.map(it => <TouchableOpacity
                                    style={styles.radioItem}>
                                    <View style={styles.radioBorder}>
                                        <View style={[styles.radioFill, {
                                            backgroundColor: it.toLowerCase() === item.active
                                                ? colors.white
                                                : colors.transparent
                                        }]} />
                                    </View>
                                    <Text style={styles.certificateText}>
                                        {it}
                                    </Text>
                                </TouchableOpacity>)}
                            </View>
                        </View>)
                    }

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
        fontSize: 18,
        fontFamily: fonts.primaryBold,
        color: colors.white,
        alignSelf: 'flex-start',
        marginTop: '3%'
    },
    certificateText: {
        fontFamily: fonts.primaryMedium,
        fontSize: 13,
        color: colors.white,
    },
    itemImage: {
        borderColor: colors.white,
        paddingVertical: '5%',
        paddingHorizontal: '3%'
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
        alignSelf: 'flex-end',
        marginVertical: '10%'
    },
    buttonImage: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
})

