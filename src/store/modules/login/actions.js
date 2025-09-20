import {
    LOGIN_CHECK, LOGIN_CHECK_SUCCESS, LOGIN_CHECK_FAIL,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT_REQUEST_SUCCESS,
    LOGOUT_REQUESTED,
    LOGOUT_REQUEST_FAIL,
    SOCIAL_LOGIN, SOCIAL_LOGIN_SUCCESS, SOCIAL_LOGIN_FAIL,
} from './types';

export const LoginCheckRequest = (payload, flow) => ({
    type: LOGIN_CHECK,
    payload,
    flow,
});
export const LoginCheckSuccess = data => (
    {
        type: LOGIN_CHECK_SUCCESS,
        data
    }
);
export const LoginCheckFail = () => (
    {
        type: LOGIN_CHECK_FAIL
    }
);

export const loginRequest = (data, navigation) => ({
    type: LOGIN,
    data,
    navigation,
});
export const loginSuccess = data => (
    {
        type: LOGIN_SUCCESS,
        data
    }
);
export const loginFail = () => (
    {
        type: LOGIN_FAIL
    }
);

export const logoutRequest = (authError, id, navigation) => ({
    type: LOGOUT_REQUESTED,
    authError,
    id,
    navigation,
});

export const logoutSuccess = data => ({
    type: LOGOUT_REQUEST_SUCCESS,
    data,
});
export const logoutFail = () => ({
    type: LOGOUT_REQUEST_FAIL,
});