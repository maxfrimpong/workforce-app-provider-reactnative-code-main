import {
    CANCEL_ORDER_START,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAILURE,
    GET_COMPLETE_LIST_FAILURE,
    GET_COMPLETE_LIST_START,
    GET_COMPLETE_LIST_SUCCESS,
    GET_IN_PROCESS_LIST_FAILURE,
    GET_IN_PROCESS_LIST_START,
    GET_IN_PROCESS_LIST_SUCCESS,
    REFRESH_IN_PROCESS_LIST_START,
    REFRESH_COMPLETE_LIST_START,
    SUBMIT_REVIEW_START,
    SUBMIT_REVIEW_SUCCESS,
    SUBMIT_REVIEW_FAILURESS,
} from './types';

export const getInProcessListStart = (payload, navigation) => ({
    type: GET_IN_PROCESS_LIST_START,
    payload,
    navigation,
});
export const getInProcessListSuccess = payload => (
    {
        type: GET_IN_PROCESS_LIST_SUCCESS,
        payload
    }
);
export const getInProcessListFailure = () => (
    {
        type: GET_IN_PROCESS_LIST_FAILURE,
    }
);
export const refreshInProcessListStart = (payload, navigation) => ({
    type: REFRESH_IN_PROCESS_LIST_START,
    payload,
    navigation,
});

export const getCompleteListStart = (payload, navigation) => ({
    type: GET_COMPLETE_LIST_START,
    payload,
    navigation,
});
export const getCompleteListSuccess = payload => (
    {
        type: GET_COMPLETE_LIST_SUCCESS,
        payload
    }
);
export const getCompleteListFailure = () => (
    {
        type: GET_COMPLETE_LIST_FAILURE,
    }
);
export const refreshCompleteListStart = (payload, navigation) => ({
    type: REFRESH_COMPLETE_LIST_START,
    payload,
    navigation,
});

export const cancelOrderStart = (payload, navigation) => ({
    type: CANCEL_ORDER_START,
    payload,
    navigation,
});
export const cancelOrderSuccess = payload => (
    {
        type: CANCEL_ORDER_SUCCESS,
        payload
    }
);
export const cancelOrderFailure = () => (
    {
        type: CANCEL_ORDER_FAILURE,
    }
);

export const submitReviewStart = (payload, navigation) => ({
    type: SUBMIT_REVIEW_START,
    payload,
    navigation,
});
export const submitReviewSuccess = payload => (
    {
        type: SUBMIT_REVIEW_SUCCESS,
        payload
    }
);
export const submitReviewFailure = () => (
    {
        type: SUBMIT_REVIEW_FAILURESS,
    }
);