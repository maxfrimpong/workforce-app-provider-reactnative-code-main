import { takeEvery, put, call } from 'redux-saga/effects';
import {
  ADD_CARD_START, GET_CARDS_LIST_START, REGISTER_CARD_START, REMOVE_CARD_START,
} from './types';
import {
  addCardFailure,
  addCardSuccess,
  getCardsListFailure,
  getCardsListStart,
  getCardsListSuccess,
  removeCardFailure,
  removeCardSuccess,
} from './actions';
import { Request } from "../../../services";
import {
  apiConfig,
  apiSuccess,
  convertToFormData,
  errorToast,
  hideLoader,
  screenName,
  showLoader,
  successToast
} from '../../../utils';
import { navigate } from '../../../navigation/RootNavigation';
import { loginSuccess } from '../login/actions';

/******************** Add Card Saga Actions *******************/

function* addCard({ payload, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.addCard,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(addCardSuccess(response.data))
      yield put(getCardsListStart(payload, navigation))
      successToast(response.message);
      navigation.goBack()
    } else {
      yield* hideLoader(false, '');
      yield put(addCardFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(addCardFailure());
  }
}

/******************** Get Card List Saga Actions *******************/

function* getCardsList({ }) {
  yield* showLoader(false);
  try {
    const response = yield Request.get(
      apiConfig.getCards,
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(getCardsListSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(getCardsListFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getCardsListFailure());
  }
}

/******************** Remove Card Saga Actions *******************/

function* removeCard({ payload, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.removeCard,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(removeCardSuccess(payload))
      successToast(response.message);
    } else {
      yield* hideLoader(false, '');
      yield put(removeCardFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(removeCardFailure());
  }
}

function* sagaPayment() {
  yield takeEvery(ADD_CARD_START, addCard);
  yield takeEvery(GET_CARDS_LIST_START, getCardsList);
  yield takeEvery(REMOVE_CARD_START, removeCard);

}

export default sagaPayment;
