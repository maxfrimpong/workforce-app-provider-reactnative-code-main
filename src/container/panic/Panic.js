import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Image
} from 'react-native'
import { useDispatch } from 'react-redux'
import { RoundButton } from '../../components/atoms'
import { hideLoading, showLoading } from '../../components/customLoader/action'
import { Header } from '../../components/molecules'
import { Request } from '../../services'
import { apiConfig, apiSuccess, colors, customAlert, errorToast, fonts, images, screenName, successToast } from '../../utils'

export const Panic = ({ navigation, route }) => {

    // ************ Hooks Functions **************** //

    const dispatch = useDispatch()

    const [panicData, setPanicData] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            getEmergencyContacts()
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [])

    // ************** Main Functions ************** //

    const getEmergencyContacts = async () => {
        dispatch(showLoading())
        try {
            const response = await Request.get(
                apiConfig.getEmergency,
            );
            console.log('response', response)
            if (response.status == apiSuccess) {
                setPanicData(response?.data)
            } else {
                errorToast(response.message)
            }
            dispatch(hideLoading())
        } catch (error) {
            dispatch(hideLoading())
            console.log('API ERROR', error)
        }
    }

    const handleLongPress = data => () => {
        customAlert(
            'Delete',
            'Are you sure you want to delete this contact',
            'Delete',
            'Cancel',
            { onAccept: () => removeEmergencyContact(data) }
        )
    }

    const removeEmergencyContact = async (data) => {
        dispatch(showLoading())
        let payload = {
            contactId: data?._id,
        }
        try {
            const response = await Request.post(
                apiConfig.removeEmergency,
                payload
            );
            console.log('response', response)
            if (response.status == apiSuccess) {
                successToast(response?.message)
                const newArray = panicData.filter(item => item?._id !== data?._id)
                setPanicData(newArray)
            } else {
                errorToast(response.message)
            }
            dispatch(hideLoading())
        } catch (error) {
            dispatch(hideLoading())
            console.log('API ERROR', error)
        }
    }

    return (
        <View style={styles.mainView}>
            <Header
                title='Emergency Contact'
                menu
            />
            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                data={panicData}
                keyExtractor={(item, index) => `${index}_emergencyList`}
                renderItem={({ item, indec }) =>
                    <TouchableOpacity
                        onLongPress={handleLongPress(item)}
                        style={styles.itemWrapper}>
                        <Image
                            style={styles.itemImage}
                            source={item?.image ? { uri: item?.image } : images.dummyProfile}
                        />
                        <View style={styles.itemTextWrapper}>
                            <Text style={styles.name}>
                                {item?.name}
                            </Text>
                            <Text style={styles.number}>
                                {item?.contactNumber}
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
            />
            <View style={styles.floatingButton}>
                <RoundButton
                    onPress={() => navigation.navigate(screenName.myContacts)}
                    icon={images.icAdd}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white
    },
    contentContainerStyle: {
        paddingHorizontal: '8%',
    },
    itemWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '3%',
        borderBottomWidth: .5,
        borderColor: colors.border,
        marginTop: 5
    },
    itemImage: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    itemTextWrapper: {
        width: '80%',
        paddingLeft: '3%'
    },
    name: {
        fontFamily: fonts.primaryMedium,
        fontSize: 17,
        color: colors.textBlack
    },
    number: {
        fontFamily: fonts.primaryRegular,
        fontSize: 13,
        color: colors.textGrey
    },
    floatingButton: {
        position: 'absolute',
        bottom: '5%',
        right: '5%'
    }
})