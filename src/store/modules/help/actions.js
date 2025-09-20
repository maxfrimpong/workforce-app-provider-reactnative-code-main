import {
    SEND_MESSAGE_START,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAILURE,

} from './types';

export const sendMessageStart = (payload, navigation) => ({
    type: SEND_MESSAGE_START,
    payload,
    navigation,
});
export const sendMessageSuccess = payload => (
    {
        type: SEND_MESSAGE_SUCCESS,
        payload
    }
);
export const sendMessageFailure = () => (
    {
        type: SEND_MESSAGE_FAILURE
    }
);

