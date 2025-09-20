import { SEND_OTP, SEND_OTP_SUCCESS, SEND_OTP_FAIL } from './types';

const INITIAL_STATE = {
    sendOtpData: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEND_OTP:
            return {
                ...state,
            };
        case SEND_OTP_SUCCESS:
            return {
                ...state,
                sendOtpData: action.data
            };
        case SEND_OTP_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
};
