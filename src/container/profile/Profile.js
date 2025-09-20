import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { BottomButton } from '../../components/atoms'
import { Header } from '../../components/molecules'
import { colors, fonts, images, screenName, statusStrings } from '../../utils'

export const Profile = ({
    navigation,
    route,
}) => {

    // ******* Hokks Function ******* //

    const [profileArray, setProfileArray] = useState([])

    const user = useSelector(state => state.loginReducer.loginData)

    useEffect(() => {
        setProfileArray(user?.accountType === statusStrings.individual
            ? individualArray
            : companyArray)
    }, [])

    // ******* Main Function ****** //


    return (
        <View style={styles.mainView}>
            <Header
                menu
                borderRound
                title='Profile'
            />

            <ScrollView contentContainerStyle={styles.contentContainerStyle}>

                {/* Content View */}



                <View style={styles.formWrapper}>

                    {profileArray.map((item, index) =>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(item.screen, {
                                accountType: user?.accountType,
                                flowProfile: true
                            })}
                            style={[styles.itemWrapper, {
                                borderBottomWidth: profileArray.length === index + 1 ? 0 : .5
                            }]}>
                            <Text style={styles.valueText}>
                                {item.title}
                            </Text>
                            <Image style={styles.itemIcon}
                                source={images.icArrowOption}
                            />
                        </TouchableOpacity>)}
                </View>


            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.primary
    },
    contentContainerStyle: {
        paddingHorizontal: '8%',
        alignItems: 'center',
        paddingVertical: 20
    },
    formWrapper: {
        width: '100%',
        paddingVertical: '5%',
    },
    itemWrapper: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: '2%',
        paddingVertical: '5%',
        borderColor: colors.white,
        justifyContent: 'space-between'
    },
    itemIcon: {
        height: 14,
        width: 14,
        resizeMode: 'contain'
    },
    valueText: {
        fontFamily: fonts.primaryBold,
        fontSize: 17,
        color: colors.white,
    }
})

const individualArray = [
    {
        title: 'Create your Profile',
        screen: screenName.createProfile,
    },
    {
        title: 'Address',
        screen: screenName.createAddress,
    },
    {
        title: 'ID & Legal',
        screen: screenName.createId,
    },
    {
        title: 'Add Trade Area',
        screen: screenName.createTradeArea,
    },
    {
        title: 'Qualifications',
        screen: screenName.qualifications,
    },
    {
        title: 'Security',
        screen: screenName.security,
    },
    {
        title: 'Profile Information',
        screen: screenName.profileInfo,
    },
    {
        title: 'Change Password',
        screen: screenName.changePassword,
    },
]

const companyArray = [
    {
        title: 'Create your Profile',
        screen: screenName.createProfile,
    },
    {
        title: 'Address',
        screen: screenName.createAddress,
    },
    {
        title: 'Legal & Trade Area',
        screen: screenName.createId,
    },
    {
        title: 'Portfolio',
        screen: screenName.createTradeArea,
    },
    {
        title: 'Profile Information',
        screen: screenName.profileInfo,
    },
    {
        title: 'Change Password',
        screen: screenName.changePassword,
    },
]