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

export const getChatStart = (payload, navigation) => ({
    type: GET_CHAT_START,
    payload,
    navigation,
});
export const getChatSuccess = payload => (
    {
        type: GET_CHAT_SUCCESS,
        payload
    }
);
export const getChatFailure = () => (
    {
        type: GET_CHAT_FAILURE,
    }
);

export const getMorwChatStart = (payload, navigation) => ({
    type: GET_MORE_CHAT_START,
    payload,
    navigation,
});

export const newMessage = (payload) => ({
    type: NEW_MESSAGE,
    payload,
});

export const uploadMediaStart = (payload, media) => (
    {
        type: UPLOAD_MEDIA_START,
        payload,
        media
    }
);
export const uploadMediaSuccess = payload => (
    {
        type: UPLOAD_MEDIA_SUCCESS,
        payload
    }
);
export const uploadMediaFailure = payload => (
    {
        type: UPLOAD_MEDIA_FAILURE,
        payload
    }
);