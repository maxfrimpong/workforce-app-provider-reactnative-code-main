import {
    LOGIN_CHECK, LOGIN_CHECK_SUCCESS, LOGIN_CHECK_FAIL,
    LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,
    SOCIAL_LOGIN, SOCIAL_LOGIN_SUCCESS, SOCIAL_LOGIN_FAIL,
} from './types';

const INITIAL_STATE = {
    LoginCheckData: null,
    loginData: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case LOGIN_CHECK:
            return {
                ...state,
            };
        case LOGIN_CHECK_SUCCESS:
            return {
                ...state,
                LoginCheckData: action.data
            };
        case LOGIN_CHECK_FAIL:
            return {
                ...state,
            };

        case LOGIN:
            return {
                ...state,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginData: action.data
            };
        case LOGIN_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
};
