import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { colors, fonts, images } from '../../utils';

// This component is used for single left navigation button(menu/back)

export const HeaderNav = ({
    back,
    menu,
}) => {

    const navigation = useNavigation();


    return (
        <View style={styles.mainView}>

            {/* left side management */}

            {back && <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.HeaderLeft}>
                <Image
                    style={styles.backIcon}
                    source={images.icBack}
                />
            </TouchableOpacity>}

            {
                menu && <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                    style={styles.HeaderLeft}>
                    <Image
                        style={styles.backIcon}
                        source={images.icMenuNav}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        height: 60,
        width: '100%',
    },
    HeaderLeft: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        paddingLeft: 10,
    },
    backIcon: {
        height: 60,
        width: 60,
        resizeMode: 'contain'
    },
})