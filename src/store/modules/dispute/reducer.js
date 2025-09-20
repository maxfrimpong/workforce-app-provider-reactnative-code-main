import { createReducer } from '../../../utils';
import {
    DISPUTE_ORDER_FAILURE,
    DISPUTE_ORDER_START,
    DISPUTE_ORDER_SUCCESS,
    GET_COMPLETE_DISPUTE_LIST_FAILURE,
    GET_COMPLETE_DISPUTE_LIST_START,
    GET_COMPLETE_DISPUTE_LIST_SUCCESS,
    GET_IN_PROCESS_DISPUTE_LIST_FAILURE,
    GET_IN_PROCESS_DISPUTE_LIST_START,
    GET_IN_PROCESS_DISPUTE_LIST_SUCCESS,
    REFRESH_COMPLETE_DISPUTE_LIST_START,
    REFRESH_IN_PROCESS_DISPUTE_LIST_START,
    REPLY_DISPUTE_FAILURE,
    REPLY_DISPUTE_START,
    REPLY_DISPUTE_SUCCESS,
} from './types';

const initialState = {
    isRefreshing: false,
    orderList: []

};

const getInProcessDisputeListStart = (state) => {
    return {
        ...state,
        orderList: [],
    }
}
const getInProcessDisputeListSuccess = (state, data) => {
    return {
        ...state,
        orderList: data
    }
}
const getInProcessDisputeListFailure = (state) => {
    return {
        ...state,
        isRefreshing: false,
    }
}
const refreshInProcessDisputeListStart = (state) => {
    return {
        ...state,
        isRefreshing: true,
    }
}

const getCompleteDisputeListStart = (state) => {
    return {
        ...state,
        orderList: [],
    }
}
const getCompleteDisputeListSuccess = (state, data) => {
    return {
        ...state,
        orderList: data
    }
}
const getCompleteDisputeListFailure = (state) => {
    return {
        ...state,
        isRefreshing: false,
    }
}
const refreshCompleteDisputeListStart = (state) => {
    return {
        ...state,
        isRefreshing: true,
    }
}

const disputeOrderStart = (state) => {
    return {
        ...state,
        orderList: [],
    }
}
const disputeOrderSuccess = (state, data) => {
    return {
        ...state,
        orderList: data
    }
}
const disputeOrderFailure = (state) => {
    return {
        ...state,
        isRefreshing: false,
    }
}

const replyDisputeStart = (state) => {
    return {
        ...state,
    }
}
const replyDisputeSuccess = (state, data) => {
    return {
        ...state,
    }
}
const replyDisputeFailure = (state) => {
    return {
        ...state,
    }
}

export default createReducer(initialState, {
    [GET_IN_PROCESS_DISPUTE_LIST_START]: getInProcessDisputeListStart,
    [GET_IN_PROCESS_DISPUTE_LIST_SUCCESS]: getInProcessDisputeListSuccess,
    [GET_IN_PROCESS_DISPUTE_LIST_FAILURE]: getInProcessDisputeListFailure,

    [REFRESH_IN_PROCESS_DISPUTE_LIST_START]: refreshInProcessDisputeListStart,

    [GET_COMPLETE_DISPUTE_LIST_START]: getCompleteDisputeListStart,
    [GET_COMPLETE_DISPUTE_LIST_SUCCESS]: getCompleteDisputeListSuccess,
    [GET_COMPLETE_DISPUTE_LIST_FAILURE]: getCompleteDisputeListFailure,

    [REFRESH_COMPLETE_DISPUTE_LIST_START]: refreshCompleteDisputeListStart,

    [DISPUTE_ORDER_START]: disputeOrderStart,
    [DISPUTE_ORDER_SUCCESS]: disputeOrderSuccess,
    [DISPUTE_ORDER_FAILURE]: disputeOrderFailure,

    [REPLY_DISPUTE_START]: replyDisputeStart,
    [REPLY_DISPUTE_SUCCESS]: replyDisputeSuccess,
    [REPLY_DISPUTE_FAILURE]: replyDisputeFailure,
})
