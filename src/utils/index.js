import screenName from './constants/screenName'
import { colors } from "./colors";
import { fonts } from "./fonts";
import { images } from "./images";
import { validation } from './validation'
import apiConfig, { apiFailure, apiSuccess } from './constants/apiConfig';
import {
    convertToFormData, customAlert, errorAlert, errorToast, getCurrentLocation,
    hideLoader, makeURL, myDeviceHeight, myDeviceWidth, myWatchLocation,
    notificationToast, showLoader, successToast
} from './genricUtils';
import { createReducer } from './reducerUtils';
import { statusStrings } from './strings';
import socketServices from './socket';
import socketConfig from './constants/socketConfig';

export {
    screenName,
    colors,
    fonts,
    images,
    validation,
    apiConfig,
    apiSuccess,
    apiFailure,
    successToast,
    errorToast,
    convertToFormData,
    notificationToast,
    makeURL,
    hideLoader,
    showLoader,
    createReducer,
    getCurrentLocation,
    myDeviceHeight,
    myDeviceWidth,
    statusStrings,
    customAlert,
    errorAlert,
    socketServices,
    socketConfig,
    myWatchLocation,

}



