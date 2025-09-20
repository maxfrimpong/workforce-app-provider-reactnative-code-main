import { createReducer } from '../../../utils';
import {
    ADD_CARD_FAILURE,
    ADD_CARD_START,
    ADD_CARD_SUCCESS,
    GET_CARDS_LIST_FAILURE,
    GET_CARDS_LIST_START,
    GET_CARDS_LIST_SUCCESS,
    REMOVE_CARD_FAILURE,
    REMOVE_CARD_START,
    REMOVE_CARD_SUCCESS,
} from './types';

const initialState = {
    cardData: null,
    cardList: []
};

const addCardStart = (state) => {
    return {
        ...state,
    }
}
const addCardSuccess = (state, data) => {
    return {
        ...state,
        cardData: data
    }
}
const addCardFailure = (state) => {
    return {
        ...state,
    }
}

const getCardsListStart = (state) => {
    return {
        ...state,
        cardList: [],
    }
}
const getCardsListSuccess = (state, data) => {
    return {
        ...state,
        cardList: data
    }
}
const getCardsListFailure = (state) => {
    return {
        ...state,
    }
}

const removeCardStart = (state) => {
    return {
        ...state,
    }
}
const removeCardSuccess = (state, data) => {

    return {
        ...state,
        cardList: state.cardList.filter(item => item._id !== data._id)
    }
}
const removeCardFailure = (state) => {
    return {
        ...state,
    }
}


export default createReducer(initialState, {
    [ADD_CARD_START]: addCardStart,
    [ADD_CARD_SUCCESS]: addCardSuccess,
    [ADD_CARD_FAILURE]: addCardFailure,

    [GET_CARDS_LIST_START]: getCardsListStart,
    [GET_CARDS_LIST_SUCCESS]: getCardsListSuccess,
    [GET_CARDS_LIST_FAILURE]: getCardsListFailure,

    [REMOVE_CARD_START]: removeCardStart,
    [REMOVE_CARD_SUCCESS]: removeCardSuccess,
    [REMOVE_CARD_FAILURE]: removeCardFailure,
})
