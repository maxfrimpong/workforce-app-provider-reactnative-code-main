import { createReducer } from '../../../utils';
import {
    SEND_MESSAGE_FAILURE,
    SEND_MESSAGE_START,
    SEND_MESSAGE_SUCCESS,
} from './types';

const initialState = {
    sendMessage: null,
};

const sendMessageStart = (state) => {
    return {
        ...state,
    }
}
const sendMessageSuccess = (state, data) => {
    return {
        ...state,
        sendMessage: data
    }
}
const sendMessageFailure = (state) => {
    return {
        ...state,
        isRefreshing: false,
    }
}


export default createReducer(initialState, {
    [SEND_MESSAGE_START]: sendMessageStart,
    [SEND_MESSAGE_SUCCESS]: sendMessageSuccess,
    [SEND_MESSAGE_FAILURE]: sendMessageFailure,

})
