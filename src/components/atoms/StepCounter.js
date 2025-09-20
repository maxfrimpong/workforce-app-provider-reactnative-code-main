import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    StyleSheet,
} from 'react-native'
import { colors, fonts } from '../../utils'

export const StepCounter = ({
    isCompany,
    showIndicator,
    stepValue
}) => {
    return (
        <View style={styles.mainView}>
            <Text style={[styles.stepText, {
                color: showIndicator ? colors.white : colors.primary,
            }]}>
                Step {showIndicator ? 'B' : 'A'} ({stepValue})
            </Text>
            {showIndicator && <View style={styles.indicatorWrapper}>
                {(isCompany ? [1, 2, 3, 4, 5] : [1, 2, 3, 4, 5, 6, 7]).map(item =>
                    <View
                        style={[styles.itemView, {
                            backgroundColor: stepValue === item ? colors.white : `${colors.white}60`
                        }]}
                    />
                )}
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        width: '100%',
        marginVertical: '5%',
        alignItems: 'center'
    },
    stepText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 17,
        marginBottom: '2%'
    },
    indicatorWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemView: {
        height: 3,
        width: 7,
        borderRadius: 1.5,
        marginRight: 5
    }
})
