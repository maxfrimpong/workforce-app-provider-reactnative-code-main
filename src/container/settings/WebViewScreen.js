import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView
} from 'react-native'
import { WebView } from 'react-native-webview';
import { Header } from '../../components/molecules';
import config from '../../config';
import { colors } from '../../utils';

export const WebViewScreen = ({ navigation, route }) => {

    const {
        name,
        url
    } = route?.params?.data
    console.log(`${config.API_URL}${url}`)

    return (
        <View style={styles.mainView}>
            <SafeAreaView />
            <Header
                back
                title={name}
            />
            <WebView
                source={{ uri: `${config.API_URL}${url}` }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white

    }
})