import {
    ADD_CARD_FAILURE,
    ADD_CARD_START,
    ADD_CARD_SUCCESS,
    GET_CARDS_LIST_FAILURE,
    GET_CARDS_LIST_START,
    GET_CARDS_LIST_SUCCESS,
    REGISTER_CARD_FAILURE,
    REGISTER_CARD_START,
    REGISTER_CARD_SUCCESS,
    REMOVE_CARD_FAILURE,
    REMOVE_CARD_START,
    REMOVE_CARD_SUCCESS
} from './types';

export const addCardStart = (payload, navigation) => ({
    type: ADD_CARD_START,
    payload,
    navigation,
});
export const addCardSuccess = payload => (
    {
        type: ADD_CARD_SUCCESS,
        payload
    }
);
export const addCardFailure = () => (
    {
        type: ADD_CARD_FAILURE,
    }
);

export const getCardsListStart = (payload, navigation) => ({
    type: GET_CARDS_LIST_START,
    payload,
    navigation,
});
export const getCardsListSuccess = payload => (
    {
        type: GET_CARDS_LIST_SUCCESS,
        payload
    }
);
export const getCardsListFailure = () => (
    {
        type: GET_CARDS_LIST_FAILURE,
    }
);

export const removeCardStart = (payload, navigation) => ({
    type: REMOVE_CARD_START,
    payload,
    navigation,
});
export const removeCardSuccess = payload => (
    {
        type: REMOVE_CARD_SUCCESS,
        payload
    }
);
export const removeCardFailure = () => (
    {
        type: REMOVE_CARD_FAILURE,
    }
);