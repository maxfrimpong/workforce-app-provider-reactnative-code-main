import React, { useState, useEffect } from 'react'
import {
    TouchableOpacity,
    Text,
} from 'react-native'
import { colors, fonts } from '../../utils'

export const BottomButton = ({
    name,
    mainStyle,
    nameColor,
    ...props
}) => {
    return (
        <TouchableOpacity
            style={{
                width: '100%',
                height: 50,
                borderRadius: 25,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                ...mainStyle
            }}
            {...props}
        >
            <Text style={{
                fontSize: 17,
                fontFamily: fonts.primaryBold,
                color: nameColor ?? colors.white
            }}>
                {name}
            </Text>
        </TouchableOpacity>
    )
}