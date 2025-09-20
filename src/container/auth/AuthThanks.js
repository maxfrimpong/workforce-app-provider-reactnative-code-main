import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { BottomButton } from '../../components/atoms'
import { colors, fonts, images, screenName } from '../../utils'

export const AuthThanks = ({ navigation, route }) => {
    return (
        <View style={styles.mainView}>
            <Image
                style={styles.thanksImage}
                source={images.icAuthTY}
            />
            <Text style={styles.thankYou}>
                Thank You
            </Text>
            <Text style={styles.success}>
                Your registration is successful.{'\n'}
                Waiting for admin's approval.
            </Text>

            <BottomButton
                onPress={() => navigation.navigate(screenName.login, { login: true })}
                mainStyle={{
                    marginTop: '10%'
                }}
                name='Go To Login'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: '8%'
    },
    thanksImage: {
        height: 70,
        width: 70,
        resizeMode: 'contain'
    },
    thankYou: {
        fontFamily: fonts.primaryMedium,
        fontSize: 27,
        color: colors.textBlack,
        marginTop: '5%'
    },
    success: {
        fontFamily: fonts.primaryMedium,
        fontSize: 13,
        color: colors.textGrey,
        marginTop: '4%',
        textAlign: 'center'
    }
})