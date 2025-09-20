import React, { useState, useEffect } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    FlatList,
} from 'react-native'
import Modal from 'react-native-modal'
import { colors, fonts, images } from '../../utils'

export const FilterModal = ({
    isVisible,
    onCancel
}) => {
    return (
        <Modal
            isVisible={isVisible}
            style={styles.modalStyle}
            onBackdropPress={onCancel}
        >
            <View style={styles.mainView}>
                <SafeAreaView />
                <View style={styles.headerView}>
                    <TouchableOpacity
                        style={styles.resetButton}
                    >
                        <Text style={styles.resetText}>
                            RESET
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.screenName}>
                        FILTER
                    </Text>
                </View>

                <FlatList
                    contentContainerStyle={styles.contentContainerStyle}
                    data={settingsData}
                    keyExtractor={(item, index) => `${index}_FilterList`}
                    renderItem={({ item, index }) =>
                        <View>
                            <TouchableOpacity style={styles.topLvlWrapper}>
                                <Text style={styles.itemText}>
                                    {item.name}
                                </Text>
                                <Image
                                    style={styles.itemImage}
                                    source={item.isOpend ? images.icUpArrow : images.icDropArrow}
                                />
                            </TouchableOpacity>
                            {
                                item.isOpend &&
                                <View >
                                    {item?.items.map(mainItem =>
                                        <TouchableOpacity style={styles.topLvlWrapper}>
                                            <Text style={styles.mainText}>
                                                {mainItem.name}
                                            </Text>

                                            <View style={styles.radioButton} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            }
                        </View>
                    }
                />


                <View>
                    <TouchableOpacity
                        onPress={onCancel}
                        style={styles.buttonWrapper}>
                        <Text style={styles.buttonText}>
                            Apply
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalStyle: {
        margin: 0,
        justifyContent: 'flex-end'
    },
    mainView: {
        height: '100%',
        width: '70%',
        backgroundColor: colors.white,
        paddingHorizontal: '8%',
        alignSelf: 'flex-end'
    },
    headerView: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    resetButton: {
        position: 'absolute',
        left: 0,
        zIndex: 2
    },
    resetText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 14,
        color: colors.textRed
    },
    screenName: {
        fontFamily: fonts.primaryBold,
        fontSize: 17,
        color: colors.textLightBlack
    },



    contentContainerStyle: {
        paddingVertical: '15%'
    },
    topLvlWrapper: {
        paddingVertical: '3%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemText: {
        fontFamily: fonts.primaryBold,
        fontSize: 15,
        color: colors.textLightBlack
    },
    itemImage: {
        height: 20,
        width: 30,
        resizeMode: 'contain'
    },
    radioButton: {
        height: 10,
        width: 10,
        borderWidth: 1,
        borderRadius: 10 / 2,
        borderColor: colors.border,
        marginRight: '5%'
    },
    mainText: {
        fontFamily: fonts.primaryRegular,
        fontSize: 13,
        color: colors.textLightBlack
    },
    buttonWrapper: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: colors.primary,
        alignSelf: 'center',
        marginVertical: '8%'
    },
    buttonText: {
        fontFamily: fonts.primaryMedium,
        fontSize: 15,
        color: colors.white,
    }
})

settingsData = [
    {
        name: 'Sort',
        isOpend: true,
        items: [
            {
                name: 'Price: High to Low',
            },
            {
                name: 'Price: High to Low',
            },
            {
                name: 'Price: High to Low',
            },
            {
                name: 'Price: High to Low',
            },
        ]
    },
    {
        name: 'Categories',
        isOpend: false,
        items: [],
    },
    {
        name: 'Country',
        isOpend: false,
        items: [],
    },
    {
        name: 'State',
        isOpend: false,
        items: [],
    },
    {
        name: 'Availability',
        isOpend: false,
        items: [],
    },
    {
        name: 'Price',
        isOpend: false,
        items: [],
    },
    {
        isOpend: false,
        name: 'Rating',
        items: [],
    },
    {
        name: 'Store Name',
        isOpend: true,
        items: [],
    },
    {
        name: 'Brand Name',
        isOpend: false,
        items: [],
    },
]