import { REGISTER, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

const INITIAL_STATE = {
    registerData: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                registerData: action.data
            };
        case REGISTER_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
};
