import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,

} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { RoundButton } from '../../components/atoms/RoundButton'
import { Header } from '../../components/molecules/Header'
import { colors, fonts, images, screenName } from '../../utils'

export const RegistrationType = ({ navigation, route }) => {

    const { params } = route;


    const [typeData, setTypeData] = useState({
        active: 'Individual',
        typearray: ['Individual', 'Company']
    })

    const handleSubmit = () => {
        navigation.navigate(screenName.createProfile, {
            accountType: typeData.active.toLowerCase(),
            ...params?.passedData
        })
    }

    return (
        <View style={styles.mainView}>
            <SafeAreaView />
            <Header
                back
                title='Type of Registration'
            />
            <ScrollView contentContainerStyle={styles.contentContainerStyle}>
                <Text style={styles.stepText}>
                    Step A (4)
                </Text>

                <Text style={styles.fieldHeading}>
                    Are you an individual or a company?
                </Text>

                <View style={styles.radioWrapper}>
                    {typeData?.typearray.map(item => <TouchableOpacity
                        onPress={() => setTypeData(data => ({
                            ...data,
                            active: item
                        }))}
                        style={styles.radioItem}>
                        <View style={styles.radioBorder}>
                            <View style={[styles.radioFill, {
                                backgroundColor: typeData.active === item
                                    ? colors.black
                                    : colors.transparent
                            }]} />
                        </View>
                        <Text style={styles.fieldHeading}>
                            {item}
                        </Text>
                    </TouchableOpacity>)}
                </View>

                <RoundButton
                    onPress={handleSubmit}
                    mainstyles={{
                        marginTop: '40%'
                    }}
                    icon={images.icNext}
                    iconStyles={{
                        tintColor: colors.primary
                    }}
                />

            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainerStyle: {
        paddingHorizontal: '8%'
    },
    stepText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 17,
        color: colors.primary,
        marginBottom: '5%',
        marginTop: '5%',
        alignSelf: 'center'
    },
    fieldHeading: {
        fontSize: 15,
        fontFamily: fonts.primaryBold,
        color: colors.textBlack,
        alignSelf: 'flex-start',
        marginTop: '3%'
    },
    radioWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '3%'
    },
    radioItem: {
        width: '47%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    radioBorder: {
        height: 16,
        width: 16,
        borderRadius: 8,
        borderWidth: .5,
        marginRight: 5,
        borderColor: colors.black,
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioFill: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
})
