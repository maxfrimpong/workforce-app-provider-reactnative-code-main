import { takeEvery, put, call } from 'redux-saga/effects';
import {
  DISPUTE_ORDER_START,
  GET_COMPLETE_DISPUTE_LIST_START,
  GET_IN_PROCESS_DISPUTE_LIST_START,
  REFRESH_COMPLETE_DISPUTE_LIST_START,
  REFRESH_IN_PROCESS_DISPUTE_LIST_START,
  REPLY_DISPUTE_START,
} from './types';
import {
  disputeOrderFailure,
  disputeOrderSuccess,
  getCompleteDisputeListFailure,
  getCompleteDisputeListSuccess,
  getInProcessDisputeListFailure,
  getInProcessDisputeListSuccess,
  replyDisputeFailure,
  replyDisputeSuccess,
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

function* getInProcessDisputeList({ payload, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.sendSupport,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(getInProcessDisputeListSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(getInProcessDisputeListFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getInProcessDisputeListFailure());
  }
}

function* refreshInProcessDisputeList({ payload, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.sendSupport,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(getInProcessDisputeListSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(getInProcessDisputeListFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getInProcessDisputeListFailure());
  }
}

/******************** Get Complete Saga Actions *******************/

function* getCompleteDisputeList({ payload, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.sendSupport,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(getCompleteDisputeListSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(getCompleteDisputeListFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getCompleteDisputeListFailure());
  }
}

function* refreshCompleteDisputeList({ payload, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.sendSupport,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(getCompleteDisputeListSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(getCompleteDisputeListFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getCompleteDisputeListFailure());
  }
}

/******************** Cancel Order Saga Actions *******************/

function* disputeOrder({ payload, navigation }) {
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
      yield put(disputeOrderSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(disputeOrderFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(disputeOrderFailure());
  }
}

/******************** Reply Dispute Saga Actions *******************/

function* ReplyDispute({ payload, navigation }) {
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
      yield put(replyDisputeSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(replyDisputeFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(replyDisputeFailure());
  }
}

function* sagaOrders() {
  yield takeEvery(GET_IN_PROCESS_DISPUTE_LIST_START, getInProcessDisputeList);
  yield takeEvery(REFRESH_IN_PROCESS_DISPUTE_LIST_START, refreshInProcessDisputeList);

  yield takeEvery(GET_COMPLETE_DISPUTE_LIST_START, getCompleteDisputeList);
  yield takeEvery(REFRESH_COMPLETE_DISPUTE_LIST_START, refreshCompleteDisputeList);

  yield takeEvery(DISPUTE_ORDER_START, disputeOrder);

  yield takeEvery(REPLY_DISPUTE_START, ReplyDispute);

}

export default sagaOrders;
