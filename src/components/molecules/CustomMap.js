import React, { useState, useEffect } from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Modal from 'react-native-modal'
import { colors, fonts, images, successToast } from '../../utils'

export const CustomMap = ({
    location
}) => {

    const [regionDelta, setRegionDelta] = useState({
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })
    const [zoomLimit, setZoomLimit] = useState(0)
    const [fullScreen, setFullScreen] = useState(false)

    return (
        <View style={styles.mapWraper}>

            {/* Map Modal */}

            <Modal
                isVisible={fullScreen}
                style={styles.mapModal}
            >
                <>
                    <TouchableOpacity
                        onPress={() => setFullScreen(false)}
                        style={styles.minimizeButton}
                    >
                        <Image
                            style={styles.minimizeIcon}
                            source={images.icMinimize}
                        />
                    </TouchableOpacity>
                    <MapView
                        provider={'google'}
                        style={{ flex: 1 }}
                        region={{
                            ...location?.location,
                            ...regionDelta,
                        }}
                    >
                        <Marker
                            coordinate={location?.location}
                        >
                            <Image
                                style={styles.iconMarker}
                                source={images.markerCircle}
                            />
                        </Marker>
                    </MapView>
                </>
            </Modal>


            {/* Render Map */}
            <MapView
                scrollEnabled={false}
                zoomTapEnabled={false}
                zoomEnabled={false}
                provider={'google'}
                style={styles.mapView}
                region={{
                    ...location?.location,
                    ...regionDelta,
                }}
            >
                <Marker
                    coordinate={location?.location}
                >
                    <Image
                        style={styles.iconMarker}
                        source={images.markerCircle}
                    />
                </Marker>
            </MapView>

            {/* Render floating icons */}

            <View style={styles.plusMinusWrapper}>
                <TouchableOpacity
                    disabled={zoomLimit === 3}
                    onPress={() => {
                        setZoomLimit(data => data + 1)
                        setRegionDelta(data => ({
                            latitudeDelta: data.latitudeDelta - 0.0050,
                            longitudeDelta: data.longitudeDelta - 0.0050,
                        }))
                    }}
                >
                    <Image
                        style={styles.zoomIcon}
                        source={images.icPlus}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={zoomLimit === -3}
                    onPress={() => {
                        setZoomLimit(data => data - 1)
                        setRegionDelta(data => ({
                            latitudeDelta: data.latitudeDelta + 0.0050,
                            longitudeDelta: data.longitudeDelta + 0.0050,
                        }))
                    }}>
                    <Image
                        style={styles.zoomIcon}
                        source={images.icMinus}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={() => setFullScreen(true)}
                style={styles.zoomButton}>
                <Image
                    style={styles.zoomIcon}
                    source={images.icZoom}
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => successToast(location?.name, 'Location Address')}
                style={styles.infoButton}>
                <Image
                    style={styles.infoIcon}
                    source={images.icInfo}
                />
            </TouchableOpacity>

            {/* Render Botton location Text */}

            <View style={styles.bottomWrapper}>
                <Image
                    style={styles.bottomIcon}
                    source={images.icLocPin}
                />
                <Text
                    style={styles.locationText}
                    numberOfLines={1}
                >
                    {location?.name}
                </Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mapWraper: {
        width: '95%',
        height: 250,
        backgroundColor: colors.white,
        alignSelf: 'center',
        marginVertical: '5%',
        position: 'relative',
    },
    mapView: {
        width: '100%',
        height: '88%'
    },
    iconMarker: {
        height: 90,
        width: 90,
        resizeMode: 'contain',
    },
    zoomButton: {
        position: 'absolute',
        right: 5,
        top: 5
    },
    zoomIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    plusMinusWrapper: {
        position: 'absolute',
        left: 5,
        top: 5,
        backgroundColor: colors.white,
        borderRadius: 3
    },
    infoButton: {
        position: 'absolute',
        right: 5,
        bottom: '15%'
    },
    infoIcon: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    bottomWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '3%'
    },
    bottomIcon: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        marginRight: 5
    },
    locationText: {
        fontFamily: fonts.secondaryRegular,
        fontSize: 15,
        color: colors.black,
        width: '85%'
    },
    mapModal: {
        margin: 0,
    },
    minimizeButton: {
        position: 'absolute',
        top: '10%',
        right: '5%',
        zIndex: 2,
        backgroundColor: colors.white,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    minimizeIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    }
})