import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { colors, fonts, images } from '../../utils'
import Modal from 'react-native-modal'
import { BottomButton } from '../atoms'


export const MultiSelect = ({
    icon,
    iconRight,
    value,
    data,
    inputStyle,
    onChange,
    initialValue
}) => {

    const [multiSelctData, setMultiSelctData] = useState({
        listData: [],
        modalActive: false
    })

    useEffect(() => {
        if (data) {
            let newArray = data;
            if (initialValue) {
                data.map((mainItem, mainIndex) =>
                    initialValue.map((selectedItem) => {
                        if (mainItem.label === selectedItem) {
                            newArray[mainIndex].isSelected = true
                        }
                    })
                )
            }
            setMultiSelctData(myData => ({
                ...myData,
                listData: data
            }))
        }
    }, [data])

    const handleItemSelect = (passedItem, passedIndex) => () => {
        const newArray = multiSelctData.listData.map((item, index) =>
            index === passedIndex ? {
                ...item,
                isSelected: !item?.isSelected
            } : item
        )
        setMultiSelctData(data => ({
            ...data,
            listData: newArray
        }))
    }

    const handleSubmit = () => {
        const newString = multiSelctData.listData
            .filter(item => item?.isSelected === true)
            .map(item => `${item?.label}`)
            .toString()
        console.log(newString)
        onChange(newString)
        setMultiSelctData(data => ({
            ...data,
            modalActive: false,
        }))
    }

    return (
        <>
            {/* Render main component */}
            <TouchableOpacity
                onPress={() => setMultiSelctData(data => ({
                    ...data,
                    modalActive: true
                }))}
                activeOpacity={0.7}
                style={styles.mainView}>
                {icon &&
                    <Image style={styles.icon}
                        source={icon}
                    />
                }
                <Text
                    numberOfLines={1}
                    style={inputStyle}>
                    {value}
                </Text>
                {iconRight && <Image style={styles.iconRight}
                    source={iconRight}
                />}
            </TouchableOpacity>

            {/* Render Modal */}
            <Modal
                isVisible={multiSelctData.modalActive}
            >
                <View style={styles.modalMainView}>
                    <FlatList
                        data={multiSelctData?.listData}
                        keyExtractor={(item, index) => `${index}_regionModal`}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                onPress={handleItemSelect(item, index)}
                                activeOpacity={.6}
                                style={styles.itemWrapper}>
                                <Image
                                    style={styles.checkIcon}
                                    source={item?.isSelected ? images.icCircleCheck : images.icCircleUncheck}
                                />

                                <Text style={styles.itemText}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        }
                    />

                    <View style={styles.buttonWrapper}>
                        <BottomButton
                            activeOpacity={0.7}
                            onPress={() => setMultiSelctData(data => ({
                                ...data,
                                modalActive: false
                            }))}
                            mainStyle={styles.button}
                            name='Close'
                        />
                        <BottomButton
                            activeOpacity={0.7}
                            onPress={handleSubmit}
                            mainStyle={styles.button}
                            name='Done'
                        />
                    </View>

                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        height: 45,
        width: '100%',
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: colors.white,
        marginVertical: '2%',
        alignItems: 'center',
        paddingHorizontal: '5%'
    },
    icon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginRight: '5%'
    },
    iconRight: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        position: 'absolute',
        right: '5%',
    },
    modalMainView: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingHorizontal: '5%',
        paddingVertical: '5%'
    },
    itemWrapper: {
        paddingVertical: '2%',
        flexDirection: 'row',
        alignContent: 'center'
    },
    checkIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginRight: 5
    },
    itemText: {
        fontFamily: fonts.primaryMedium,
        fontSize: 14,
        color: colors.textBlack
    },
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: '3%'
    },
    button: {
        width: '45%',
        height: 40
    }
})