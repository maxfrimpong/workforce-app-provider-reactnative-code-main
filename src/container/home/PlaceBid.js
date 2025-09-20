import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Switch
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useDispatch } from 'react-redux'
import { BottomButton } from '../../components/atoms'
import { FieldDate, FieldInput } from '../../components/formComponents'
import { Header } from '../../components/molecules'
import { placeBidStart } from '../../store/modules/home/actions'
import { colors, errorToast, fonts, validation } from '../../utils'

export const PlaceBid = ({ navigation, route }) => {

    // ************* Hooks Functions ************ //

    const dispatch = useDispatch()

    const [placeBidData, setPlaceBidData] = useState({
        availableForJob: false,
        tripId: route?.params?.tripId,
    })

    const { control,
        handleSubmit,
        errors,
        setValue
    } = useForm({ mode: 'all' });

    // *************** Main Functions ************** //

    const validateForm = () => {
        if (!placeBidData?.availableForJob) {
            errorToast('Please set your availability.')
            return false
        } else {
            return true
        }
    }

    const onSubmit = formValues => {
        console.log('onSubmitPress', formValues)
        if (validateForm()) {
            const payload = {
                ...formValues,
                ...placeBidData,
            }
            dispatch(placeBidStart(payload))
        }
    }

    return (
        <View style={styles.mainView}>
            <Header
                title='Place Bid'
                back
                borderRound
            />
            <KeyboardAwareScrollView contentContainerStyle={styles.contentContainerStyle}>

                <View style={styles.switchWrapper}>
                    <Text style={styles.fieldHeading}>
                        Available for the Job
                    </Text>
                    <Switch
                        onValueChange={(value) => setPlaceBidData(data => ({
                            ...data,
                            availableForJob: value
                        }))}
                        value={placeBidData?.availableForJob}
                        trackColor={{ false: colors.border, true: colors.border }}
                        thumbColor={colors.primary}
                        ios_backgroundColor={colors.border}
                    />
                </View>

                <View style={styles.formWrapper}>

                    {/* Render Date View */}

                    <Text style={styles.fieldHeading}>
                        Date
                    </Text>
                    <View style={styles.horizontalView}>
                        <View style={styles.horizontalItem}>
                            <Text style={styles.dateHeading}>
                                From
                            </Text>
                            <FieldDate
                                control={control}
                                inputStyle={styles.inputDateStyle}
                                inputViewStyle={styles.inputViewStyle}
                                rules={validation.required}
                                name='fromDate'
                                msg={errors?.fromDate?.message}
                                format='DD MMM YYYY'
                                minimumDate={new Date()}
                            />
                        </View>

                        <View style={styles.horizontalItem}>
                            <Text style={styles.dateHeading}>
                                To
                            </Text>
                            <FieldDate
                                control={control}
                                inputStyle={styles.inputDateStyle}
                                inputViewStyle={styles.inputViewStyle}
                                rules={validation.required}
                                name='toDate'
                                msg={errors?.toDate?.message}
                                format='DD MMM YYYY'
                                minimumDate={new Date()}
                            />
                        </View>
                    </View>


                    <Text style={styles.fieldHeading}>
                        Estimated cost of labour
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.numaric}
                        name='estimatedCost'
                        msg={errors?.estimatedCost?.message}
                        keyboardType='number-pad'
                    />

                    {/* <Text style={styles.fieldHeading}>
                        Additional information
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={styles.inputMultiStyle}
                        inputViewStyle={[styles.inputViewStyle, {
                            height: 120,
                            alignItems: 'flex-start',
                            paddingVertical: '2%'
                        }]}
                        rules={validation.required}
                        multiline={true}
                        placeholder='Write here...'
                        name='additionalInfo'
                        msg={errors?.additionalInfo?.message}
                    /> */}

                    <BottomButton
                        name='Send Bid'
                        onPress={handleSubmit(onSubmit)}
                        mainStyle={styles.buttonWrapper}
                    />
                </View>

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
        paddingVertical: '5%'
    },
    switchWrapper: {
        paddingHorizontal: '8%',
        paddingVertical: '3%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: .5,
        borderColor: colors.border
    },
    fieldHeading: {
        fontFamily: fonts.secondarySemibold,
        fontSize: 18,
        color: colors.textBlack,
        marginTop: '3%'
    },
    formWrapper: {
        paddingHorizontal: '8%',
        paddingVertical: '5%'
    },
    horizontalView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    horizontalItem: {
        width: '47%'
    },
    dateHeading: {
        fontFamily: fonts.primaryBold,
        fontSize: 13,
        color: colors.textLightBlack,
        paddingHorizontal: '5%',
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
    inputMultiStyle: {
        fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: colors.textGrey,
        padding: 0,
        paddingLeft: 10,
        width: '100%',
        height: '100%',
        textAlignVertical: 'top'
    },
    inputDateStyle: {
        fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: colors.textGrey,
        padding: 0,
        paddingLeft: 10,
        width: '80%',
        paddingVertical: 15
    },
    buttonWrapper: {
        marginTop: '10%'
    }
})