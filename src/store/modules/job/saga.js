import {takeEvery, put, call} from 'redux-saga/effects';
import {
  MAKE_PAYMENT_START,
  BID_MATCHED_START,
  JOB_DETAILS_START,
  BID_PLACED_START,
  RATE_START,
  SERVICE_PROVIDER_START,
} from './types';
import {
  makePaymentFailure,
  makePaymentSuccess,
  bidMatchedFailure,
  bidMatchedSuccess,
  jobDetailsFailure,
  jobDetailsSuccess,
  bidPlacedFailure,
  bidPlacedSuccess,
  rateFailure,
  rateSuccess,
  serviceProviderFailure,
  serviceProviderSuccess,
} from './actions';
import {Request} from '../../../services';
import {
  apiConfig,
  apiSuccess,
  convertToFormData,
  errorToast,
  hideLoader,
  screenName,
  showLoader,
  successToast,
} from '../../../utils';
import {navigate} from '../../../navigation/RootNavigation';

/******************** Job Saga Actions *******************/

function* bidPlaced() {
  yield* showLoader(false);
  try {
    const response = yield Request.get(apiConfig.bidPlaced);
    console.log('response', response);
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(bidPlacedSuccess(response.data));
    } else {
      yield* hideLoader(false, '');
      yield put(bidPlacedFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(bidPlacedFailure());
  }
}

function* bidMatched() {
  yield* showLoader(false);
  try {
    const response = yield Request.get(apiConfig.bidMatched);
    console.log('response', response);
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(bidMatchedSuccess(response.data));
    } else {
      yield* hideLoader(false, '');
      yield put(bidMatchedFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(bidMatchedFailure());
  }
}

/******************** bid minor fun Saga Actions *******************/

function* jobDetails({id}) {
  yield* showLoader(false);
  try {
    const response = yield Request.get(`${apiConfig.jobDetails}${id}`);
    console.log('response', response);
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(jobDetailsSuccess(response.data));
    } else {
      yield* hideLoader(false, '');
      yield put(jobDetailsFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(jobDetailsFailure());
  }
}

function* makePayment({payload}) {
  console.log('makePayment data', payload);
  yield* showLoader(false);
  try {
    const response = yield Request.post(apiConfig.makePayment, payload);
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(makePaymentSuccess(response.data));
      successToast(response?.message);
      navigate(screenName.myPortfolio);
    } else {
      yield* hideLoader(false, '');
      yield put(makePaymentFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(makePaymentFailure());
  }
}

function* rateService({payload}) {
  yield* showLoader(false);
  console.log('data', payload);
  try {
    const response = yield Request.post(apiConfig.rateService, payload);
    console.log('response', response);
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(rateSuccess(response.data));
      navigate(screenName.mainHome);
    } else {
      yield* hideLoader(false, '');
      yield put(rateFailure());
      errorToast(response.message);
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(rateFailure());
  }
}

function* sagaJob() {
  yield takeEvery(BID_PLACED_START, bidPlaced);
  yield takeEvery(BID_MATCHED_START, bidMatched);

  yield takeEvery(JOB_DETAILS_START, jobDetails);
  yield takeEvery(MAKE_PAYMENT_START, makePayment);
  yield takeEvery(RATE_START, rateService);
}

export default sagaJob;
