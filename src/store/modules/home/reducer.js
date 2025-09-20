import { createReducer } from '../../../utils';
import {
    ADMIN_DATA_FAILURE,
    ADMIN_DATA_START,
    ADMIN_DATA_SUCCESS,
    CURRENT_LOCATION,
    GET_REQUEST_LIST_FAILURE,
    GET_REQUEST_LIST_START,
    GET_REQUEST_LIST_SUCCESS,
    PLACE_BID_FAILURE,
    PLACE_BID_START,
    PLACE_BID_SUCCESS,
    REQUEST_DETAILS_FAILURE,
    REQUEST_DETAILS_START,
    REQUEST_DETAILS_SUCCESS,
} from './types';

const initialState = {
    isRefreshing: false,
    requestList: [],
    currentLocation: {},
    adminSettings: {},
};


// ************* Current Location ************** //

const currentLocation = (state, data) => {
    return {
        ...state,
        currentLocation: data
    }
}

const getRequestListStart = (state) => {
    return {
        ...state,
        requestList: [],
    }
}
const getRequestListSuccess = (state, data) => {
    return {
        ...state,
        requestList: data,
        isRefreshing: false,
    }
}
const getRequestListFailure = (state) => {
    return {
        ...state,
        isRefreshing: false,
    }
}

const placeBidStart = (state) => {
    return {
        ...state,
    }
}
const placeBidSuccess = (state, data) => {
    return {
        ...state,
    }
}
const placeBidFailure = (state) => {
    return {
        ...state,
    }
}

const adminDataStart = (state) => {
    return {
        ...state,
        adminSettings: {},
    }
}
const adminDataSuccess = (state, data) => {
    return {
        ...state,
        adminSettings: data
    }
}
const adminDataFailure = (state) => {
    return {
        ...state,
    }
}

const requestDetailsStart = (state) => {
    return {
        ...state,
    }
}
const requestDetailsSuccess = (state, data) => {
    console.log(state)
    return {
        ...state,
        requestList: [data, ...state?.requestList],
    }
}
const requestDetailsFailure = (state) => {
    return {
        ...state,
    }
}

export default createReducer(initialState, {
    [CURRENT_LOCATION]: currentLocation,

    [GET_REQUEST_LIST_START]: getRequestListStart,
    [GET_REQUEST_LIST_SUCCESS]: getRequestListSuccess,
    [GET_REQUEST_LIST_FAILURE]: getRequestListFailure,

    [PLACE_BID_START]: placeBidStart,
    [PLACE_BID_SUCCESS]: placeBidSuccess,
    [PLACE_BID_FAILURE]: placeBidFailure,

    [ADMIN_DATA_START]: adminDataStart,
    [ADMIN_DATA_SUCCESS]: adminDataSuccess,
    [ADMIN_DATA_FAILURE]: adminDataFailure,

    [REQUEST_DETAILS_START]: requestDetailsStart,
    [REQUEST_DETAILS_SUCCESS]: requestDetailsSuccess,
    [REQUEST_DETAILS_FAILURE]: requestDetailsFailure,
})
