import React, { useState, useEffect } from 'react'
import {
    View,
    SafeAreaView,
    Image,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Keyboard,
    Platform,
    ActivityIndicator,
} from 'react-native'
import moment from 'moment'
import { Header } from '../../components/molecules/Header'
import { colors, convertToFormData, fonts, images, myDeviceHeight, socketServices } from '../../utils'
import { MyImagePicker } from '../../components/molecules'
import { useDispatch, useSelector } from 'react-redux'
import { getChatStart, newMessage, uploadMediaStart } from '../../store/modules/chat/actions'
import Modal from 'react-native-modal';

const spaceRegex = /^.+\s.+$/

export const Chat = ({ navigation, route }) => {

    // ***************** Hooks Function ***************** //

    const dispatch = useDispatch()

    const {
        user,
        chatData,
    } = useSelector(state => ({
        user: state.loginReducer.loginData,
        chatData: state.chatReducer.chatData,
    }))

    const [chatScreenData, setChatScreenData] = useState({
        driverId: user?._id,
        customerId: route?.params?.customerId,
        keyboardHeight: 0,
        msg: '',
        showImage: false,
        imageUri: '',
        showOptions: false,
        selectedItem: null,
        isLoading: false,
    })

    useEffect(() => {
        console.log(user)
        dispatch(getChatStart({ customerId: chatScreenData.customerId }))
        socketServices.on('newMessage', data => {
            console.log('new message', data)
            dispatch(newMessage(data))
        })
        const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
            setChatScreenData(data => ({
                ...data,
                keyboardHeight: e.endCoordinates.height
            }))
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", (e) => {
            setChatScreenData(data => ({
                ...data,
                keyboardHeight: 0
            }))
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
            socketServices.removeListener('newMessage')
        };
    }, []);

    // **************** Main Functions ****************** //

    const handleSendMessage = () => {
        const {
            msg,
            customerId,
            driverId
        } = chatScreenData
        const newItem = {
            type: 'msg',
            customerId,
            driverId,
            msg,
            byCustomer: false,
            byDriver: true,
        }
        socketServices.emit('sendMessage', newItem, data => {
            console.log('Sent message', data)
        })
        setChatScreenData(data => ({
            ...data,
            msg: ''
        }))
    }

    const handleMediaShare = src => {
        const {
            customerId,
            driverId
        } = chatScreenData
        const formData = convertToFormData({ file: src })
        const newItem = {
            customerId,
            driverId,
            media: src?.uri,
            byCustomer: false,
            byDriver: true,
            isLoading: true
        }
        dispatch(uploadMediaStart(formData, newItem))
    }

    const handleItemPress = payload => () => {
        if (payload?.media) {
            setChatScreenData(data => ({
                ...data,
                showImage: true,
                imageUri: payload.media
            }))
        }
    }

    const renderImageView = () => {
        const {
            imageUri
        } = chatScreenData
        return (
            <Modal
                style={{
                    margin: 0
                }}
                isVisible={chatScreenData.showImage}
            >
                <View style={styles.popupMainView}>
                    <TouchableOpacity
                        onPress={() => setChatScreenData(data => ({
                            ...data,
                            showImage: false
                        }))}
                        style={styles.popupBackWrapper}>
                        <Image
                            style={styles.popupBackIcon}
                            source={images.icBack}
                        />
                    </TouchableOpacity>
                    <Image
                        style={styles.popupImage}
                        source={{ uri: imageUri }}
                    />
                </View>
            </Modal>
        )
    }


    return (
        <View style={styles.mainView}>
            <SafeAreaView />

            {/* ******** Render Popups ******** */}
            {renderImageView()}

            <Header
                back
                title='Chat'
            />

            {/* *********** Render Chat List Data ********** */}

            <FlatList
                contentContainerStyle={styles.contentContainerStyle}
                inverted
                data={chatData}
                renderItem={({ item, index }) =>
                    <View style={[styles.itemWrapper, {
                        alignItems: item?.byDriver ? 'flex-end' : 'flex-start'
                    }]}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={handleItemPress(item)}
                            style={styles.bubbleWrapper}>
                            {item?.byDriver && <Image
                                style={styles.chatProfile}
                                source={user?.profileImage ? { uri: user?.profileImage } : images.dummyProfile}
                            />}
                            <View style={[styles.bubbleStyle, {
                                backgroundColor: item?.byDriver ? colors.primary : colors.inputBackground
                            }]}>
                                {item?.msg
                                    ? <Text style={[styles.msgText, {
                                        color: item?.byDriver ? colors.white : colors.textBlack
                                    }]}>
                                        {item?.msg}
                                    </Text>
                                    : <Image
                                        style={styles.msgImage}
                                        source={{ uri: item?.media }}
                                    />}
                                {item?.isLoading && <ActivityIndicator
                                    size='small'
                                    color={colors.white}
                                />}
                            </View>
                        </TouchableOpacity>
                        <Text style={[styles.timeText, {
                            marginLeft: item?.byDriver ? '13%' : 0
                        }]}>
                            {moment(item?.createdAt).format('h:mm A')}
                        </Text>
                    </View>
                }
            />

            {/* *********** Render Message & Media share View ********** */}

            <View style={[styles.bottomWrapper, {
                marginBottom: Platform.OS === 'ios' ? chatScreenData.keyboardHeight : 0
            }]}>
                <MyImagePicker
                    onChange={src => handleMediaShare(src)}
                    style={styles.buttomWrapper}>
                    <Image
                        style={styles.mediaIcon}
                        source={images.icChatMedia}
                    />
                </MyImagePicker>
                <View style={styles.inputWrapper}>
                    <TextInput
                        multiline
                        style={styles.inputStyle}
                        value={chatScreenData?.msg}
                        onChangeText={msg => {
                            setChatScreenData(data => ({
                                ...data,
                                msg
                            }))
                        }}
                    />
                </View>
                <TouchableOpacity
                    disabled={chatScreenData.msg.trim().length === 0}
                    onPress={handleSendMessage}
                    style={styles.buttomWrapper}>
                    <Text style={styles.sendText}>
                        Send
                    </Text>
                </TouchableOpacity>
            </View>
            <SafeAreaView />
        </View>
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white
    },
    contentContainerStyle: {
        paddingHorizontal: '5%'
    },
    itemWrapper: {
        width: '100%',
        marginVertical: '3%'
    },
    bubbleWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    chatProfile: {
        height: 35,
        width: 35,
        marginRight: '3%',
        borderRadius: 35 / 2,
    },
    bubbleStyle: {
        paddingVertical: '3%',
        paddingHorizontal: '5%',
        maxWidth: '60%',
        borderRadius: 20
    },
    msgText: {
        fontSize: 14,
        fontFamily: fonts.primaryRegular,
        textAlign: 'left'
    },
    msgImage: {
        height: 150,
        width: 150
    },
    timeText: {
        fontSize: 11,
        fontFamily: fonts.primaryRegular,
        textAlign: 'left',
        color: colors.textLightGrey,
        marginTop: '2%'
    },
    bottomWrapper: {
        width: '100%',
        paddingHorizontal: '4%',
        flexDirection: 'row',
        paddingVertical: '3%',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: "flex-end"
    },
    mediaIcon: {
        height: 40,
        width: 40,
        resizeMode: 'contain'
    },
    inputWrapper: {
        width: '75%',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: '5%',
        justifyContent: 'center',
        maxHeight: 120,
        paddingVertical: '1%'
    },
    inputStyle: {
        fontFamily: fonts.primaryRegular,
        fontSize: 15,
        color: colors.textBlack,
        width: '100%',
        padding: 0
    },
    buttomWrapper: {
        height: 35,
        justifyContent: 'center'
    },
    sendText: {
        fontFamily: fonts.primaryMedium,
        fontSize: 15,
        color: colors.primary
    },
    popupMainView: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.black,
        position: 'absolute',
        zIndex: 3,
        justifyContent: 'center'
    },
    popupImage: {
        height: myDeviceHeight(80),
        width: '100%',
        resizeMode: 'contain',
        opacity: 1
    },
    popupBackWrapper: {
        position: 'absolute',
        zIndex: 2,
        top: '5%',
        left: '5%'
    },
    popupBackIcon: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    optionsMainView: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.border
    },
    optionsText: {
        fontFamily: fonts.primaryBold,
        fontSize: 15,
        color: colors.textBlack
    }
})
