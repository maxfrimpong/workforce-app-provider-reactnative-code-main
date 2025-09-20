import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    View, Alert,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Text,
    SafeAreaView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MyImagePicker } from '.';
import { logoutRequest } from '../../store/modules/login/actions';
import { updateProfileImageRequest } from '../../store/modules/profile/actions';
import { colors, convertToFormData, fonts, images, screenName, statusStrings } from '../../utils';

const menuArray = [
    { name: 'HOME', icon: images.menuHome, routeName: screenName.mainHome },
    { name: 'MY PORTFOLIO', icon: images.menuJob, routeName: screenName.mainJobs },
    { name: 'PROFILE', icon: images.menuProfile, routeName: screenName.mainProfile },
    { name: 'PAYMENT DETAILS', icon: images.menuPay, routeName: screenName.mainPayment },
    { name: 'JOBS', icon: images.menuEarning, routeName: screenName.earning },
    { name: 'PANIC', icon: images.menuSOS, routeName: screenName.mainPanic },
    { name: 'HELP & SUPPORT', icon: images.menuHelp, routeName: screenName.mainHelp },
    // { name: 'SETTINGS', icon: images.menuSetting, routeName: screenName.mainSettings },
    { name: 'LOG OUT', icon: images.menuLogout, routeName: '' },
];


const CustomDrawer = ({ navigation }) => {

    /******************* Hooks Functions *********************/

    const dispatch = useDispatch();
    const { user } = useSelector(state => ({
        user: state.loginReducer.loginData
    }))
    const [status, setStatus] = useState('')

    /********************* Handled methods *********************/

    useEffect(() => {
        if (user?.profileInformation) {
            let newArray = []
            Object.entries(user?.profileInformation).map(([key, value]) => {
                newArray = [...newArray, value]
            })
            if (newArray.includes('pending')) {
                setStatus('Pending')
            } else {
                setStatus('')
            }
        }
    }, [user])

    const handleProfileImage = src => {
        const formData = convertToFormData({ image: src })
        dispatch(updateProfileImageRequest(
            formData,
            navigation
        ))
    }

    const logoutAgain = async () => {
        const id = user?._id
        dispatch(logoutRequest(false, id, navigation));
    };

    const LogoutAction = () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Ok', onPress: () => logoutAgain() },
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed') },
            ],
            { cancelable: false },
        );
    };

    return (
        <View style={{ flex: 1 }}>

            {/*********************** Profile Section  *******************/}

            <View
                style={{
                    flex: 0.40,
                }}>
                <ImageBackground style={{
                    height: '100%',
                    width: '100%',
                    paddingHorizontal: 24,
                    paddingVertical: 24,
                    backgroundColor: colors.primary,
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                }}
                    source={images.dummyDrawerBg}
                >
                    <SafeAreaView />
                    <Text style={{
                        top: 40,
                        position: 'absolute',
                        zIndex: 2,
                        right: '5%',
                        fontFamily: fonts.primaryMedium,
                        fontSize: 14,
                        color: colors.white
                    }}>
                        {status}
                    </Text>
                    <MyImagePicker
                        onChange={src => handleProfileImage(src)}
                        style={{
                            borderRadius: 65 / 2,
                            borderColor: 'white',
                            height: 65,
                            width: 65,
                            marginLeft: 5,
                        }}>
                        <ImageBackground
                            source={user?.profileImage && user?.profileImage !== 'none'
                                ? { uri: user?.profileImage }
                                : images.dummyProfile}
                            resizeMode={'cover'}
                            imageStyle={{ borderRadius: 65 / 2 }}
                            style={{
                                height: '100%',
                                width: '100%',
                            }}>

                        </ImageBackground>
                    </MyImagePicker>
                    <View style={{ paddingHorizontal: 8 }}>
                        <Text
                            numberOfLines={1}
                            style={styles.profileText}>
                            {user?.accountType === statusStrings.individual
                                ? `${user?.firstName} ${user?.lastName}`
                                : user?.companyName}
                        </Text>
                        <View style={styles.ratingView}>
                            <Text style={styles.numberText}>
                                {`${user?.countryCode}-${user?.mobileNumber}`}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>

            {/*********************** Menu Section  **************************/}

            <ScrollView
                style={{
                    flex: 1,
                    paddingTop: 20,
                }}
                contentContainerStyle={{
                    paddingBottom: 60
                }}
            >

                {menuArray.map(menu => (
                    <TouchableOpacity
                        key={menu.name}
                        onPress={() =>
                            menu.name == 'LOG OUT' ? LogoutAction() :
                                menu.routeName
                                    ? navigation.reset({
                                        routes: [{ name: menu.routeName }]
                                    })
                                    : alert('progress')
                        }
                        style={[styles.menuRow]}>
                        <View style={{ flex: 0.2 }}>
                            <Image
                                source={menu.icon}
                                style={{
                                    height: 22,
                                    width: 22,
                                    alignSelf: 'center',
                                }}
                                resizeMode={'contain'}
                            />
                        </View>
                        <View style={{
                            flex: 0.9,
                        }}>
                            <Text style={styles.menuText}>
                                {menu.name}
                            </Text>
                        </View>

                    </TouchableOpacity>
                ))}
            </ScrollView>

        </View >
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    profileText: {
        color: colors.white,
        fontFamily: fonts.primaryRegular,
        fontSize: 16
    },
    imageStyle: {
        height: 48,
        width: 48,
        alignSelf: 'flex-start',
    },
    topContainer: {
        flex: 0.2,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    menuText: {
        fontSize: 13,
        color: colors.textBlack,
        fontFamily: fonts.primaryBold
    },
    starIcon: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        tintColor: colors.white
    },
    menuRow: {
        paddingVertical: 10,
        marginHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    numberText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.primaryRegular
    },
    ratingView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomView: {
        paddingHorizontal: '10%',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    socialWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '5%',
        borderTopWidth: 1,
        borderColor: colors.border,
        width: '100%',
        justifyContent: 'space-between'
    },
    socialIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    appVersion: {
        fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: colors.textLightGrey,
        marginBottom: 5
    }
});
