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
    JOB_MATCHED_FAILURE,
    JOB_MATCHED_START,
    JOB_MATCHED_SUCCESS,
    BID_PLACED_FAILURE,
    BID_PLACED_START,
    BID_PLACED_SUCCESS,
    RATE_FAILURE,
    RATE_START,
    RATE_SUCCESS,
    SERVICE_PROVIDER_FAILURE,
    SERVICE_PROVIDER_START,
    SERVICE_PROVIDER_SUCCESS,
    BID_PLACED_STATUS,
    BID_MATCHED_STATUS
} from './types';

export const bidPlacedStart = () => ({
    type: BID_PLACED_START,
});
export const bidPlacedSuccess = payload => (
    {
        type: BID_PLACED_SUCCESS,
        payload
    }
);
export const bidPlacedFailure = () => (
    {
        type: BID_PLACED_FAILURE,
    }
);

export const bidMatchedStart = () => ({
    type: BID_MATCHED_START,
});
export const bidMatchedSuccess = payload => (
    {
        type: BID_MATCHED_SUCCESS,
        payload
    }
);
export const bidMatchedFailure = () => (
    {
        type: BID_MATCHED_FAILURE,
    }
);

export const jobDetailsStart = (id) => (
    {
        type: JOB_DETAILS_START,
        id
    }
);
export const jobDetailsSuccess = payload => (
    {
        type: JOB_DETAILS_SUCCESS,
        payload
    }
);
export const jobDetailsFailure = () => (
    {
        type: JOB_DETAILS_FAILURE,
    }
);

export const makePaymentStart = (payload) => (
    {
        type: MAKE_PAYMENT_START,
        payload
    }
);
export const makePaymentSuccess = payload => (
    {
        type: MAKE_PAYMENT_SUCCESS,
        payload
    }
);
export const makePaymentFailure = () => (
    {
        type: MAKE_PAYMENT_FAILURE,
    }
);

export const rateStart = (payload) => (
    {
        type: RATE_START,
        payload
    }
);
export const rateSuccess = payload => (
    {
        type: RATE_SUCCESS,
        payload
    }
);
export const rateFailure = () => (
    {
        type: RATE_FAILURE,
    }
);

export const bidPlacedStatus = (payload) => (
    {
        type: BID_PLACED_STATUS,
        payload
    }
);
export const bidMatchedStatus = (payload) => (
    {
        type: BID_MATCHED_STATUS,
        payload
    }
);