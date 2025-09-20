import { VERIFY_OTP, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAIL } from './types';

const INITIAL_STATE = {
    verifyOtpData: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case VERIFY_OTP:
            return {
                ...state,
            };
        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                verifyOtpData: action.data
            };
        case VERIFY_OTP_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
};
