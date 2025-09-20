import {
    DISPUTE_ORDER_START,
    DISPUTE_ORDER_SUCCESS,
    DISPUTE_ORDER_FAILURE,
    GET_COMPLETE_DISPUTE_LIST_FAILURE,
    GET_COMPLETE_DISPUTE_LIST_START,
    GET_COMPLETE_DISPUTE_LIST_SUCCESS,
    GET_IN_PROCESS_DISPUTE_LIST_FAILURE,
    GET_IN_PROCESS_DISPUTE_LIST_START,
    GET_IN_PROCESS_DISPUTE_LIST_SUCCESS,
    REFRESH_IN_PROCESS_DISPUTE_LIST_START,
    REFRESH_COMPLETE_DISPUTE_LIST_START,
    REPLY_DISPUTE_START,
    REPLY_DISPUTE_SUCCESS,
    REPLY_DISPUTE_FAILURE,
} from './types';

export const getInProcessDisputeListStart = (payload, navigation) => ({
    type: GET_IN_PROCESS_DISPUTE_LIST_START,
    payload,
    navigation,
});
export const getInProcessDisputeListSuccess = payload => (
    {
        type: GET_IN_PROCESS_DISPUTE_LIST_SUCCESS,
        payload
    }
);
export const getInProcessDisputeListFailure = () => (
    {
        type: GET_IN_PROCESS_DISPUTE_LIST_FAILURE,
    }
);
export const refreshInProcessDisputeListStart = (payload, navigation) => ({
    type: REFRESH_IN_PROCESS_DISPUTE_LIST_START,
    payload,
    navigation,
});

export const getCompleteDisputeListStart = (payload, navigation) => ({
    type: GET_COMPLETE_DISPUTE_LIST_START,
    payload,
    navigation,
});
export const getCompleteDisputeListSuccess = payload => (
    {
        type: GET_COMPLETE_DISPUTE_LIST_SUCCESS,
        payload
    }
);
export const getCompleteDisputeListFailure = () => (
    {
        type: GET_COMPLETE_DISPUTE_LIST_FAILURE,
    }
);
export const refreshCompleteDisputeListStart = (payload, navigation) => ({
    type: REFRESH_COMPLETE_DISPUTE_LIST_START,
    payload,
    navigation,
});

export const disputeOrderStart = (payload, navigation) => ({
    type: DISPUTE_ORDER_START,
    payload,
    navigation,
});
export const disputeOrderSuccess = payload => (
    {
        type: DISPUTE_ORDER_SUCCESS,
        payload
    }
);
export const disputeOrderFailure = () => (
    {
        type: DISPUTE_ORDER_FAILURE,
    }
);

export const replyDisputeStart = (payload, navigation) => ({
    type: REPLY_DISPUTE_START,
    payload,
    navigation,
});
export const replyDisputeSuccess = payload => (
    {
        type: REPLY_DISPUTE_SUCCESS,
        payload
    }
);
export const replyDisputeFailure = () => (
    {
        type: REPLY_DISPUTE_FAILURE,
    }
);