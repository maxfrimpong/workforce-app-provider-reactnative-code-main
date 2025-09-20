import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Image,
    PermissionsAndroid,
    Platform
} from 'react-native'
import { Header } from '../../components/molecules'
import { apiConfig, apiSuccess, colors, convertToFormData, errorToast, fonts, images, successToast } from '../../utils'
import Contacts from 'react-native-contacts';
import { Request } from '../../services';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../components/customLoader/action';



export const MyContacts = ({ navigation, route }) => {

    // ************** Hooks Functions *************** //

    const dispatch = useDispatch()

    const [contactData, setContactData] = useState([])

    useEffect(() => {
        Platform.OS === 'android' ? checkPermission() : getContact()
    }, [])

    // ************** Main Functions **************** //

    const checkPermission = () => {

        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.',
                'buttonPositive': 'Allow'
            }
        )
            .then(res => {
                console.log('res', res)
                if (res == 'granted') {
                    getContact()
                }
            }
            )
            .catch(e => console.log('Permission Error', e))
    }

    const getContact = () => {
        Contacts.getAll().then(contacts => {
            console.log('Contact Response', contacts)
            setContactData(contacts)
        }).catch(e => console.log('Contact ERROR', e))
    }

    const handleAddToEmergency = data => async () => {
        dispatch(showLoading())
        let payload = {
            name: data?.displayName ?? `${data?.givenName} ${data?.familyName}` ?? '',
            contactNumber: data?.phoneNumbers[0]?.number ?? '',
        }
        data?.thumbnailPath && data?.thumbnailPath !== '' ? payload['image'] = {
            uri: data?.thumbnailPath,
            type: "image/jpeg",
            name: 'ContactImage'
        } : null;
        const formData = convertToFormData(payload)
        try {
            const response = await Request.post(
                apiConfig.addEmergency,
                formData
            );
            console.log('response', response)
            if (response.status == apiSuccess) {
                successToast(response?.message)
                navigation.goBack()
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
                title='Add Contact'
                back
            />
            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                data={contactData}
                keyExtractor={(item, index) => `${index}_contactList`}
                renderItem={({ item, index }) =>
                    <TouchableOpacity
                        onPress={handleAddToEmergency(item)}
                        style={styles.itemWrapper}>
                        <Image
                            style={styles.itemImage}
                            source={item?.thumbnailPath !== '' ? { uri: item?.thumbnailPath } : images.dummyProfile}
                        />
                        <View style={styles.itemTextWrapper}>
                            <Text style={styles.name}>
                                {item?.displayName ?? `${item?.givenName} ${item?.familyName}`}
                            </Text>
                            <Text style={styles.number}>
                                {item?.phoneNumbers[0]?.number}
                            </Text>
                        </View>
                    </TouchableOpacity>
                }
            />
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
})