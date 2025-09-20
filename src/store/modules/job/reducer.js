import { createReducer } from '../../../utils';
import {
    MAKE_PAYMENT_FAILURE,
    MAKE_PAYMENT_START,
    MAKE_PAYMENT_SUCCESS,
    BID_MATCHED_FAILURE,
    BID_MATCHED_START,
    BID_MATCHED_SUCCESS,
    JOB_DETAILS_FAILURE,
    JOB_DETAILS_START,
    JOB_DETAILS_SUCCESS,
    BID_PLACED_FAILURE,
    BID_PLACED_START,
    BID_PLACED_SUCCESS,
    RATE_FAILURE,
    RATE_START,
    RATE_SUCCESS,
    BID_PLACED_STATUS,
    BID_MATCHED_STATUS,
} from './types';

const initialState = {
    bidPlacedData: [], // this variable will hold the data of active bid Placed tab
    bidMatchedData: [], // this variable will hold the data of active bid Match tab
    jobDetails: {},
};

const bidPlacedStart = (state) => {
    return {
        ...state,
        bidPlacedData: [],
    }
}
const bidPlacedSuccess = (state, data) => {
    return {
        ...state,
        bidPlacedData: data,
    }
}
const bidPlacedFailure = (state) => {
    return {
        ...state,
    }
}

const bidMatchedStart = (state) => {
    return {
        ...state,
        bidMatchedData: [],
    }
}
const bidMatchedSuccess = (state, data) => {
    return {
        ...state,
        bidMatchedData: data,
    }
}
const bidMatchedFailure = (state) => {
    return {
        ...state,
    }
}

const jobDetailsStart = (state) => {
    return {
        ...state,
        jobDetails: {},
    }
}
const jobDetailsSuccess = (state, data) => {
    return {
        ...state,
        jobDetails: data,
    }
}
const jobDetalsFailure = (state) => {
    return {
        ...state,
    }
}

const makePaymentStart = (state) => {
    return {
        ...state,
    }
}
const makePaymentSuccess = (state, data) => {
    return {
        ...state,
    }
}
const makePaymentFailure = (state) => {
    return {
        ...state,
    }
}

const rateStart = (state) => {
    return {
        ...state,
    }
}
const rateSuccess = (state, data) => {
    return {
        ...state,
    }
}
const rateFailure = (state) => {
    return {
        ...state,
    }
}

const bidPlacedStatus = (state, data) => (
    {
        ...state,
        bidPlacedData: data,
    }
);
const bidMatchedStatus = (state, data) => (
    {
        ...state,
        bidMatchedData: [data, ...state.bidMatchedData],
    }
);

export default createReducer(initialState, {
    [BID_PLACED_START]: bidPlacedStart,
    [BID_PLACED_SUCCESS]: bidPlacedSuccess,
    [BID_PLACED_FAILURE]: bidPlacedFailure,

    [BID_MATCHED_START]: bidMatchedStart,
    [BID_MATCHED_SUCCESS]: bidMatchedSuccess,
    [BID_MATCHED_FAILURE]: bidMatchedFailure,

    [JOB_DETAILS_START]: jobDetailsStart,
    [JOB_DETAILS_SUCCESS]: jobDetailsSuccess,
    [JOB_DETAILS_FAILURE]: jobDetalsFailure,

    [MAKE_PAYMENT_START]: makePaymentStart,
    [MAKE_PAYMENT_SUCCESS]: makePaymentSuccess,
    [MAKE_PAYMENT_FAILURE]: makePaymentFailure,

    [RATE_START]: rateStart,
    [RATE_SUCCESS]: rateSuccess,
    [RATE_FAILURE]: rateFailure,

    [BID_PLACED_STATUS]: bidPlacedStatus,
    [BID_MATCHED_STATUS]: bidMatchedStatus,
})
