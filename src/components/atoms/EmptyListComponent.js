import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native'
import { colors, fonts } from '../../utils'

export const EmptyListComponent = ({
    msg,
    buttonMsg,
}) => {
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontFamily: fonts.primaryLight,
                fontSize: 18
            }}>
                {msg ?? 'No data available!'}
            </Text>
            {buttonMsg && <TouchableOpacity style={{
                backgroundColor: colors.secondary,
                paddingHorizontal: '3%',
                paddingVertical: '2%',
                borderRadius: 10,
                marginTop: 10
            }}>
                <Text style={{
                    fontFamily: fonts.primaryLight,
                    fontSize: 15,
                    color: colors.white
                }}>
                    {buttonMsg}
                </Text>
            </TouchableOpacity>}
        </View>
    )
}