import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    FlatList,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Modal from 'react-native-modal'
import { colors, fonts, images, validation } from '../../utils'
import { BottomButton } from '../atoms/BottomButton'
import { FieldInput } from '../formComponents'

export const GiftModal = ({
    isVisible,
    onCancel
}) => {

    /************************* Hooks Functions *************************/

    const { control,
        handleSubmit,
        errors,
    } = useForm({ mode: 'all' });

    /********************** Form Functions *************************/

    const onSubmit = formValues => {
        console.log('on submit press===>', formValues)
    };

    return (
        <Modal
            isVisible={isVisible}
            style={styles.modalStyle}
            onBackdropPress={onCancel}
        >
            <View style={styles.mainView}>
                <SafeAreaView />
                <View style={styles.headerView}>

                    <Text style={styles.screenName}>
                        GIFT RECEIPENT DETAILS
                    </Text>

                    <TouchableOpacity
                        onPress={onCancel}
                        style={styles.resetButton}
                    >
                        <Text style={styles.resetText}>
                            X
                        </Text>
                    </TouchableOpacity>

                </View>

                {/* Scrolling Form Content */}

                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.contentContainerStyle}>

                    <Text style={styles.fieldHeading}>
                        FIRST NAME
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.name}
                        name='name'
                        msg={errors?.phone?.message}
                    />

                    <Text style={styles.fieldHeading}>
                        LAST NAME
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.name}
                        name='name'
                        msg={errors?.phone?.message}
                    />

                    <Text style={styles.fieldHeading}>
                        PHONE NUMBER
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.name}
                        name='name'
                        msg={errors?.phone?.message}
                    />

                    <Text style={styles.fieldHeading}>
                        EMAIL
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.name}
                        name='name'
                        msg={errors?.phone?.message}
                    />

                    <Text style={styles.fieldHeading}>
                        ADDRESS
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.name}
                        name='name'
                        msg={errors?.phone?.message}
                    />

                    <Text style={styles.fieldHeading}>
                        APARTMENT
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.name}
                        name='name'
                        msg={errors?.phone?.message}
                    />

                    <Text style={styles.fieldHeading}>
                        FLOOR
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.name}
                        name='name'
                        msg={errors?.phone?.message}
                    />

                    <Text style={styles.fieldHeading}>
                        COMPANY
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={styles.inputStyle}
                        inputViewStyle={styles.inputViewStyle}
                        rules={validation.name}
                        name='name'
                        msg={errors?.phone?.message}
                    />

                    <Text style={styles.fieldHeading}>
                        DELIVERY INSTRUCTION
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={[styles.inputStyle, {
                            height: 'auto'
                        }]}
                        inputViewStyle={[styles.inputViewStyle, {
                            height: 80,
                            alignItems: 'flex-start',
                            paddingVertical: 5
                        }]}
                        multiline={true}
                        rules={validation.name}
                        name='name'
                        msg={errors?.phone?.message}
                    />

                    <Text style={styles.fieldHeading}>
                        NOTE
                    </Text>
                    <FieldInput
                        control={control}
                        inputStyle={[styles.inputStyle, {
                            height: 'auto'
                        }]}
                        inputViewStyle={[styles.inputViewStyle, {
                            height: 80,
                            alignItems: 'flex-start',
                            paddingVertical: 5
                        }]}
                        multiline={true}
                        rules={validation.name}
                        name='name'
                        msg={errors?.phone?.message}
                    />

                </KeyboardAwareScrollView>


                <View>
                    <BottomButton
                        mainStyle={{
                            marginVertical: '5%'
                        }}
                        onPress={onCancel}
                        name='Submit'
                    />
                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalStyle: {
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainView: {
        height: '85%',
        width: '85%',
        backgroundColor: colors.white,
        paddingHorizontal: '5%',
        borderRadius: 15
    },
    headerView: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resetButton: {
        position: 'absolute',
        right: 0,
        top: 10,
        zIndex: 2
    },
    resetText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 18,
        color: colors.black
    },
    screenName: {
        fontFamily: fonts.primaryBold,
        fontSize: 17,
        color: colors.textBlack
    },
    contentContainerStyle: {
    },
    fieldHeading: {
        fontSize: 14,
        fontFamily: fonts.primaryBold,
        color: colors.textGrey,
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
        width: '95%',
        height: 45,
    },
})