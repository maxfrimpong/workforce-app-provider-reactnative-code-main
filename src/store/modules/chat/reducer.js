import { createReducer } from '../../../utils';
import {
    GET_CHAT_FAILURE,
    GET_CHAT_START,
    GET_CHAT_SUCCESS,
    GET_MORE_CHAT_START,
    NEW_MESSAGE,
    UPLOAD_MEDIA_FAILURE,
    UPLOAD_MEDIA_START,
    UPLOAD_MEDIA_SUCCESS,
} from './types';

const initialState = {
    chatData: [],
    gettingMoreChat: false,
};

const getChatStart = (state) => {
    return {
        ...state,
        chatData: [],
    }
}
const getChatSuccess = (state, data) => {
    return {
        ...state,
        chatData: data,
        gettingMoreChat: false,

    }
}
const getChatFailure = (state) => {
    return {
        ...state,
        isRefreshing: false,
        gettingMoreChat: false,

    }
}

const getMoreChatStart = (state) => {
    return {
        ...state,
        gettingMoreChat: true,
    }
}

const newMessage = (state, data) => {
    return {
        ...state,
        chatData: [data, ...state.chatData]
    }
}

const uploadMediaStart = (state) => {
    return {
        ...state,
    }
}
const uploadMediaSuccess = (state, data) => {
    return {
        ...state,
        chatData: data,
    }
}
const uploadMediaFailure = (state, data) => {
    return {
        ...state,
        chatData: data,
    }
}

export default createReducer(initialState, {
    [GET_CHAT_START]: getChatStart,
    [GET_CHAT_SUCCESS]: getChatSuccess,
    [GET_CHAT_FAILURE]: getChatFailure,

    [GET_MORE_CHAT_START]: getMoreChatStart,

    [NEW_MESSAGE]: newMessage,

    [UPLOAD_MEDIA_START]: uploadMediaStart,
    [UPLOAD_MEDIA_SUCCESS]: uploadMediaSuccess,
    [UPLOAD_MEDIA_FAILURE]: uploadMediaFailure,
})
