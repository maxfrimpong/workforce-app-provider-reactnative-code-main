import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
    Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { apiConfig, apiSuccess, colors, fonts, images, statusStrings } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { providerStatusStart } from '../../store/modules/home/actions';
import { Request } from '../../services';
import { loginSuccess } from '../../store/modules/login/actions';


export const Header = ({
    title,
    back,
    menu,
    right,
    rightDouble,
    headerColor,
    fontSize,
    handleSettingsPress,
    handleEditPress,
    borderRound,
    activateSwitch,
    headerHeight,
    headingColor,
}) => {

    const navigation = useNavigation();

    const dispatch = useDispatch()

    const user = useSelector(state => state.loginReducer.loginData)

    const [myStatus, setMyStatus] = useState(user?.driverStatus === statusStrings.online)

    const handleProviderStatus = async (value) => {
        console.log(value)
        setMyStatus(value)
        const payload = {
            driverStatus: value ? statusStrings.online : statusStrings.offline
        }
        try {
            const response = await Request.post(
                apiConfig.providerStatus,
                payload
            );
            console.log('response', response)
            if (response.status == apiSuccess) {
                dispatch(loginSuccess(response?.data))
            } else {
                errorToast(response.message)
                setMyStatus(!value)
            }
        } catch (error) {
            console.log('API ERROR', error)
            setMyStatus(!value)
        }
    }

    return (
        <View style={[styles.superView, {
            backgroundColor: headerColor
                ? headerColor
                : borderRound
                    ? colors.primary
                    : colors.white,
            borderBottomLeftRadius: borderRound ? 15 : 0,
            borderBottomRightRadius: borderRound ? 15 : 0,
            height: headerHeight ?? 60,
        }]}>
            <View style={styles.mainView}>

                {/* left side management */}

                {back && <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.HeaderLeft}>
                    <Image
                        style={styles.backIcon}
                        source={images.icBack}
                    />
                </TouchableOpacity>}

                {
                    menu && <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        style={styles.HeaderLeft}>
                        <Image
                            style={styles.menuIcon}
                            source={images.icMenuNav}
                        />
                    </TouchableOpacity>
                }

                {/* center Management */}
                <Text style={[styles.heading, {
                    fontSize: fontSize ? fontSize : 18,
                    color: headingColor ?? borderRound ? colors.white : colors.textBlack,
                }]}>
                    {title}
                </Text>

                {/* Right Side Management */}
                {
                    rightDouble && <TouchableOpacity
                        onPress={handleSettingsPress}
                        style={[styles.HeaderRight, {
                            right: 60
                        }]}>
                        <Image
                            style={styles.rightIcon}
                            source={images.icSettings}
                        />
                    </TouchableOpacity>
                }
                {
                    (right || rightDouble) && <TouchableOpacity
                        onPress={handleEditPress}
                        style={styles.HeaderRight}>
                        <Image
                            style={styles.rightEditIcon}
                            source={images.icSearch}
                        />
                    </TouchableOpacity>
                }
                {
                    activateSwitch &&
                    <View style={styles.HeaderRight}>
                        <Switch
                            onValueChange={(value) => handleProviderStatus(value)}
                            value={myStatus}
                            trackColor={{ false: colors.white, true: colors.white }}
                            thumbColor={colors.primary}
                            ios_backgroundColor={colors.white}
                        />
                    </View>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    superView: {

    },
    mainView: {
        minHeight: 60,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    HeaderLeft: {
        height: 60,
        width: 60,
        position: 'absolute',
        left: 0,
        justifyContent: 'center',
        zIndex: 100,
        alignItems: 'center'
    },
    backIcon: {
        height: 60,
        width: 60,
        resizeMode: 'contain'
    },
    menuIcon: {
        height: 55,
        width: 55,
        resizeMode: 'contain',
    },
    heading: {
        fontFamily: fonts.primaryBold
    },
    HeaderRight: {
        height: 60,
        width: 60,
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
        zIndex: 2,
    },
    rightIcon: {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    },
    rightEditIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
})