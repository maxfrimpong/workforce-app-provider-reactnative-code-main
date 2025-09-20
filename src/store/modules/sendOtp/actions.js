import { SEND_OTP, SEND_OTP_SUCCESS, SEND_OTP_FAIL } from './types';

export const sendOtpRequest = (payload, data) => ({
    type: SEND_OTP,
    payload,
    data,
});

export const sendOtpSuccess = data => (
    {
        type: SEND_OTP_SUCCESS,
        data
    }
);
export const sendOtpFail = () => (
    {
        type: SEND_OTP_FAIL
    }
);
