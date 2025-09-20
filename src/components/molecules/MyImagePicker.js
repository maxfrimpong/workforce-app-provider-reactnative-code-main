import React, { Children } from 'react'
import {
    Alert,
    PermissionsAndroid,
    Platform,
    TouchableOpacity
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export const MyImagePicker = ({
    onChange,
    style,
    children,
    disabled,
    onLongPress,
    ...props
}) => {

    const uploadImage = () => {
        Alert.alert(
            '', 'Upload Image From',
            [
                {
                    text: 'Camera',
                    onPress: () => Platform.OS === 'android'
                        ? handleCameraPermission()
                        : handleDeviceCamera()
                },
                {
                    text: 'Gallery',
                    onPress: () => handleDeviceGallery()
                },
                {
                    text: 'Cancel',
                },
            ],
            {
                cancelable: false
            }
        )
    }

    const handleCameraPermission = () => {
        PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.CAMERA
        ).then(res => {
            console.log('permission check response', res)
            if (res === true) {
                handleDeviceCamera()
            } else {
                PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA
                ).then(res => {
                    console.log('Permission request response', res)
                    if (res === PermissionsAndroid.RESULTS.GRANTED) {
                        handleDeviceCamera()
                    }
                }).catch(e => console.log('Camera request Permission Error', e))
            }
        }).catch(e => console.log('Camera check Permission Error', e))
    }

    const handleDeviceCamera = () => {
        launchCamera(
            {
                quality: 0.5,
                maxWidth: 512,
                maxHeight: 512,
                mediaType: 'photo',
                saveToPhotos: false
            },
            res => {
                console.log('Camera response', res)
                if (res?.didCancel) {
                    console.log('User cancelled image picker');
                } else if (res?.error) {
                    console.log('ImagePicker Error: ', res?.error);
                } else if (res?.customButton) {
                    console.log('User tapped custom button: ', res?.customButton);
                } else if (res?.assets && res?.assets[0]?.uri) {
                    const source = {
                        uri: Platform.OS === 'android' ? res?.assets[0]?.uri : res?.assets[0]?.uri.replace('file://', ''),
                        type: res?.assets[0]?.type,
                        name: 'WorkforceImages',
                    }
                    onChange(source)
                }
            })
    }

    const handleDeviceGallery = () => {
        console.log('Gallery Initiated')
        launchImageLibrary(
            {
                quality: 0.5,
                maxWidth: 512,
                maxHeight: 512,
                mediaType: 'photo',
                saveToPhotos: false
            },
            res => {
                console.log('Gallery response', res)
                if (res?.didCancel) {
                    console.log('User cancelled image picker');
                } else if (res?.error) {
                    console.log('ImagePicker Error: ', res?.error);
                } else if (res?.customButton) {
                    console.log('User tapped custom button: ', res?.customButton);
                } else if (res?.assets && res?.assets[0]?.uri) {
                    const source = {
                        uri: Platform.OS === 'android' ? res?.assets[0]?.uri : res?.assets[0]?.uri.replace('file://', ''),
                        type: res?.assets[0]?.type,
                        name: 'WorkforceImages',
                    }
                    onChange(source)
                }
            })
    }

    const newChildren = Children.map(children, child => {
        return React.cloneElement(child, { ...child.props, ...props });
    });

    return (
        <TouchableOpacity
            onLongPress={onLongPress}
            disabled={disabled}
            style={style}
            onPress={uploadImage}
        >
            {newChildren}
        </TouchableOpacity>
    )
}