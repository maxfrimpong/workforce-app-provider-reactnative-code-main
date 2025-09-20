import { NEW_PASSWORD, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_FAIL } from './types';

const INITIAL_STATE = {
    newPasswordData: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEW_PASSWORD:
            return {
                ...state,
            };
        case NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                newPasswordData: action.data
            };
        case NEW_PASSWORD_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
};
