import { VERIFY_OTP, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAIL } from './types';

export const verifyOtpRequest = (payload, flow, data, navigation) => ({
    type: VERIFY_OTP,
    payload,
    flow,
    data,
    navigation,
});

export const verifyOtpSuccess = data => (
    {
        type: VERIFY_OTP_SUCCESS,
        data
    }
);
export const verifyOtpFail = () => (
    {
        type: VERIFY_OTP_FAIL
    }
);
