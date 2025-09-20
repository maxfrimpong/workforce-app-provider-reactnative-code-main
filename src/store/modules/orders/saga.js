import { takeEvery, put, call } from 'redux-saga/effects';
import {
  CANCEL_ORDER_START,
  GET_COMPLETE_LIST_START,
  GET_IN_PROCESS_LIST_START,
  REFRESH_COMPLETE_LIST_START,
  REFRESH_IN_PROCESS_LIST_START,
  SUBMIT_REVIEW_START,
} from './types';
import {
  cancelOrderFailure,
  cancelOrderSuccess,
  getCompleteListFailure,
  getCompleteListSuccess,
  getInProcessListFailure,
  getInProcessListSuccess,
  submitReviewFailure,
  submitReviewSuccess,
} from './actions';
import { Request } from "../../../services";
import {
  apiConfig,
  apiSuccess,
  convertToFormData,
  errorToast,
  hideLoader,
  showLoader,
  successToast
} from '../../../utils';

/******************** Get In Process Saga Actions *******************/

function* getInProcessList({ payload, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.sendSupport,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(getInProcessListSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(getInProcessListFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getInProcessListFailure());
  }
}
function* refreshInProcessList({ payload, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.sendSupport,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(getInProcessListSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(getInProcessListFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getInProcessListFailure());
  }
}

/******************** Get Complete Saga Actions *******************/

function* getCompleteList({ payload, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.sendSupport,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(getCompleteListSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(getCompleteListFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getCompleteListFailure());
  }
}
function* refreshCompleteList({ payload, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.sendSupport,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(getCompleteListSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(getCompleteListFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getCompleteListFailure());
  }
}

/******************** Cancel Order Saga Actions *******************/

function* cancelOrder({ payload, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.sendSupport,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      successToast(response.message)
      yield put(cancelOrderSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(cancelOrderFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(cancelOrderFailure());
  }
}

/******************** Review Order Saga Actions *******************/

function* submitReview({ payload, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.sendSupport,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      successToast(response.message)
      yield put(submitReviewSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(submitReviewFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(submitReviewFailure());
  }
}

function* sagaOrders() {
  yield takeEvery(GET_IN_PROCESS_LIST_START, getInProcessList);
  yield takeEvery(REFRESH_IN_PROCESS_LIST_START, refreshInProcessList);

  yield takeEvery(GET_COMPLETE_LIST_START, getCompleteList);
  yield takeEvery(REFRESH_COMPLETE_LIST_START, refreshCompleteList);

  yield takeEvery(CANCEL_ORDER_START, cancelOrder);

  yield takeEvery(SUBMIT_REVIEW_START, submitReview);

}

export default sagaOrders;
