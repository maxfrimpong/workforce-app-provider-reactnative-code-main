import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native'
import { back } from 'react-native/Libraries/Animated/Easing'
import { colors, fonts, images } from '../../utils'

export const DeliveryHeader = ({
    back
}) => {

    // ******  Hooks Functions ****** //

    const navigation = useNavigation()

    return (
        <View style={styles.headerWrapper}>
            {back ?
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    < Image
                        style={styles.backImage}
                        source={images.icBack}
                    />
                </TouchableOpacity>
                : < Image
                    style={styles.headerImage}
                    source={images.icCurrentLocation}
                />}
            <View>
                <Text style={styles.deliveryText}>
                    Delivery Address
                </Text>
                <Text
                    numberOfLines={1}
                    style={styles.addressText}>
                    8502 Preston Rd. Maine Preshon Rd
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        height: 60,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingHorizontal: '5%'
    },
    headerImage: {
        height: 23,
        width: 23,
        resizeMode: 'contain',
        marginRight: '3%'
    },
    backImage: {
        height: 30,
        width: 30,
        resizeMode: 'contain',
        marginRight: '3%'
    },
    deliveryText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: colors.black
    },
    addressText: {
        fontFamily: fonts.primaryBold,
        fontSize: 15,
        color: colors.white
    },
})