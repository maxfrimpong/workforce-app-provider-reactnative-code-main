import {
    GET_REQUEST_LIST_START,
    GET_REQUEST_LIST_SUCCESS,
    GET_REQUEST_LIST_FAILURE,
    CURRENT_LOCATION,
    ADMIN_DATA_START,
    ADMIN_DATA_SUCCESS,
    ADMIN_DATA_FAILURE,
    PLACE_BID_START,
    PLACE_BID_SUCCESS,
    PLACE_BID_FAILURE,
    REQUEST_DETAILS_START,
    REQUEST_DETAILS_SUCCESS,
    REQUEST_DETAILS_FAILURE,
} from './types';

// ************** Current location ***************** //

export const currentLocation = (payload) => ({
    type: CURRENT_LOCATION,
    payload
});

// ************** Home Module ****************** //

export const getRequestListStart = () => ({
    type: GET_REQUEST_LIST_START,
});
export const getRequestListSuccess = payload => (
    {
        type: GET_REQUEST_LIST_SUCCESS,
        payload
    }
);
export const getRequestListFailure = () => (
    {
        type: GET_REQUEST_LIST_FAILURE
    }
);

export const placeBidStart = (data) => (
    {
        type: PLACE_BID_START,
        data,
    }
);
export const placeBidSuccess = (payload) => (
    {
        type: PLACE_BID_SUCCESS,
        payload
    }
);
export const placeBidFailure = () => (
    {
        type: PLACE_BID_FAILURE
    }
);

export const adminDataStart = () => (
    {
        type: ADMIN_DATA_START,
    }
);
export const adminDataSuccess = payload => (
    {
        type: ADMIN_DATA_SUCCESS,
        payload
    }
);
export const adminDataFailure = () => (
    {
        type: ADMIN_DATA_FAILURE
    }
);

export const requestDetailsStart = (data) => (
    {
        type: REQUEST_DETAILS_START,
        data
    }
);
export const requestDetailsSuccess = payload => (
    {
        type: REQUEST_DETAILS_SUCCESS,
        payload
    }
);
export const requestDetailsFailure = () => (
    {
        type: REQUEST_DETAILS_FAILURE
    }
);