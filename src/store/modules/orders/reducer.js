import { createReducer } from '../../../utils';
import {
    CANCEL_ORDER_FAILURE,
    CANCEL_ORDER_START,
    CANCEL_ORDER_SUCCESS,
    GET_COMPLETE_LIST_FAILURE,
    GET_COMPLETE_LIST_START,
    GET_COMPLETE_LIST_SUCCESS,
    GET_IN_PROCESS_LIST_FAILURE,
    GET_IN_PROCESS_LIST_START,
    GET_IN_PROCESS_LIST_SUCCESS,
    REFRESH_COMPLETE_LIST_START,
    REFRESH_IN_PROCESS_LIST_START,
    SUBMIT_REVIEW_FAILURESS,
    SUBMIT_REVIEW_START,
    SUBMIT_REVIEW_SUCCESS,
} from './types';

const initialState = {
    isRefreshing: false,
    orderList: []

};

const getInProcessListStart = (state) => {
    return {
        ...state,
        orderList: [],
    }
}
const getInProcessListSuccess = (state, data) => {
    return {
        ...state,
        orderList: data
    }
}
const getInProcessListFailure = (state) => {
    return {
        ...state,
        isRefreshing: false,
    }
}
const refreshInProcessListStart = (state) => {
    return {
        ...state,
        isRefreshing: true,
    }
}

const getCompleteListStart = (state) => {
    return {
        ...state,
        orderList: [],
    }
}
const getCompleteListSuccess = (state, data) => {
    return {
        ...state,
        orderList: data
    }
}
const getCompleteListFailure = (state) => {
    return {
        ...state,
        isRefreshing: false,
    }
}
const refreshCompleteListStart = (state) => {
    return {
        ...state,
        isRefreshing: true,
    }
}

const cancelOrderStart = (state) => {
    return {
        ...state,
        orderList: [],
    }
}
const cancelOrderSuccess = (state, data) => {
    return {
        ...state,
        orderList: data
    }
}
const cancelOrderFailure = (state) => {
    return {
        ...state,
        isRefreshing: false,
    }
}

const submitReviewStart = (state) => {
    return {
        ...state,
    }
}
const submitReviewSuccess = (state, data) => {
    return {
        ...state,
        reviewData: data
    }
}
const submitReviewFailure = (state) => {
    return {
        ...state,
    }
}

export default createReducer(initialState, {
    [GET_IN_PROCESS_LIST_START]: getInProcessListStart,
    [GET_IN_PROCESS_LIST_SUCCESS]: getInProcessListSuccess,
    [GET_IN_PROCESS_LIST_FAILURE]: getInProcessListFailure,

    [REFRESH_IN_PROCESS_LIST_START]: refreshInProcessListStart,

    [GET_COMPLETE_LIST_START]: getCompleteListStart,
    [GET_COMPLETE_LIST_SUCCESS]: getCompleteListSuccess,
    [GET_COMPLETE_LIST_FAILURE]: getCompleteListFailure,

    [REFRESH_COMPLETE_LIST_START]: refreshCompleteListStart,

    [CANCEL_ORDER_START]: cancelOrderStart,
    [CANCEL_ORDER_SUCCESS]: cancelOrderSuccess,
    [CANCEL_ORDER_FAILURE]: cancelOrderFailure,

    [SUBMIT_REVIEW_START]: submitReviewStart,
    [SUBMIT_REVIEW_SUCCESS]: submitReviewSuccess,
    [SUBMIT_REVIEW_FAILURESS]: submitReviewFailure,
})