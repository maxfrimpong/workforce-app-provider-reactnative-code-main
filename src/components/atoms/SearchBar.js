import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { colors, fonts, images } from '../../utils'

export const SearchBar = ({
    onPress,
    value,
    mainViewStyle,
}) => {

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={[styles.mainView, mainViewStyle]}>
            <Image
                style={styles.searchIcon}
                source={images.icCurrentLocation}
            />
            <Text
                numberOfLines={1}
                style={styles.inputStyle}>
                {value}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainView: {
        height: 50,
        borderRadius: 22,
        width: '100%',
        alignSelf: 'center',
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        borderWidth: .6,
        borderColor: colors.border
    },
    inputStyle: {
        fontFamily: fonts.primaryRegular,
        width: '90%',
        color: colors.textGrey
    },
    searchIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    }
})