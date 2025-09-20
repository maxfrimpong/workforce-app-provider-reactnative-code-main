import moment from 'moment'
import React, { useState, useEffect, Fragment } from 'react'
import {
    SafeAreaView,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { SearchBar } from '../../components/atoms/SearchBar'
import { Header, } from '../../components/molecules'
import { adminDataStart, getCategoryListStart, getRequestListStart, requestDetailsStart } from '../../store/modules/home/actions'
import { getProfileStart } from '../../store/modules/profile/actions'
import { colors, fonts, images, myWatchLocation, screenName, socketConfig, socketServices, statusStrings } from '../../utils'

export const HomeScreen = ({ navigation }) => {

    // ********** Hooks Functions *********** //

    const dispatch = useDispatch()

    const {
        user,
        myCurrentLocation,
        requestList,
    } = useSelector(state => ({
        user: state.loginReducer.loginData,
        myCurrentLocation: state.homeReducer.currentLocation,
        requestList: state.homeReducer.requestList,
    }))

    useEffect(() => {
        myWatchLocation()
        dispatch(adminDataStart())
        dispatch(getProfileStart())
        socketServices.initializeSocket(user?.token)
        // Socket listener
        setTimeout(() => {
            socketServices.on(
                socketConfig.getOrderRequest,
                (data) => {
                    console.log('Request Socket response', data)
                    // Home screen always stay mounted for app module.
                    // So the socket/status update for portfolio/job module
                    // Handled in "requestDetails" saga action
                    dispatch(requestDetailsStart(data?.tripId))
                }
            )
        }, 3000)
    }, [])

    useEffect(() => {
        console.log(user)
        const unsubscribe = navigation.addListener('focus', () => {
            // do something
            dispatch(getRequestListStart())
        });

        return unsubscribe;
    }, [navigation])

    useEffect(() => {
        // emit socket for location update
        if (user?.driverStatus === statusStrings.online) {
            setTimeout(() => {
                socketServices.emit(
                    socketConfig.driverLocation,
                    {
                        driverLocation: {
                            lat: myCurrentLocation?.latitude ?? user?.driverLocation?.coordinates[1],
                            lng: myCurrentLocation?.longitude ?? user?.driverLocation?.coordinates[0],
                        },
                        driverId: user._id,
                        fromConnect: true,
                        angle: 1,
                    }, (data) => console.log(data)
                )
            }, 3000)
        }
    }, [user?.driverStatus])


    // ************* Main Functions ************* //


    return (
        <View style={styles.mainView}>

            {/* Rende Header */}
            <Header
                borderRound
                menu
                title='Home'
                activateSwitch
            />

            {/* Render Content */}
            <ScrollView
                contentContainerStyle={styles.contentContainerStyle}
            >

                <Text style={styles.jobTitle}>
                    Job listing
                </Text>

                <Text style={styles.results}>
                    {requestList?.length} results
                </Text>

                {requestList.map((item, index) =>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(screenName.jobDetails, {
                            item,
                            flow: 'home'
                        })}
                        style={styles.itemWrapper}>
                        <Image
                            style={styles.itemImage}
                            source={item?.designImages.length > 0
                                ? { uri: item?.designImages[0] }
                                : images.dummyCustom}
                        />
                        <View style={{
                            width: '70%',
                        }}>
                            <Text style={styles.itemTitle}>
                                {item?.title}
                            </Text>
                            <View style={styles.rowView}>
                                <Image
                                    style={styles.smallIcon}
                                    source={images.icClock}
                                />
                                <Text style={styles.itemDate}>
                                    {item?.fromDate}
                                </Text>
                            </View>
                            <View style={[styles.rowView, {
                                marginTop: '3%'
                            }]}>
                                <Image
                                    style={styles.smallIcon}
                                    source={images.icLocPin2}
                                />
                                <Text style={styles.itemDate}>
                                    {item?.tripAddress}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white
    },
    jobTitle: {
        fontFamily: fonts.secondaryMedium,
        fontSize: 22,
        color: colors.textDarkBlack,
        marginTop: '3%'
    },
    results: {
        fontFamily: fonts.secondaryRegular,
        fontSize: 13,
        color: colors.textBlack,
        marginTop: '3%'
    },
    contentContainerStyle: {
        width: '100%',
        paddingHorizontal: '5%',
    },
    itemWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '4%'
    },
    itemImage: {
        height: 80,
        width: 80,
        borderRadius: 5,
        marginRight: 8
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemTitle: {
        fontFamily: fonts.secondaryBold,
        fontSize: 14,
        color: colors.textDarkBlack
    },
    itemDate: {
        fontFamily: fonts.secondaryLight,
        fontSize: 13,
        color: colors.textGrey
    },
    smallIcon: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        marginRight: 5
    }
})
