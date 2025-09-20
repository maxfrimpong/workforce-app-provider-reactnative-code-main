import { takeEvery, put, call, select } from 'redux-saga/effects';
import {
  ADMIN_DATA_START,
  GET_REQUEST_LIST_START,
  PLACE_BID_START,
  REQUEST_DETAILS_START,
} from './types';
import {
  adminDataFailure,
  adminDataSuccess,
  getRequestListFailure,
  getRequestListSuccess,
  placeBidFailure,
  placeBidSuccess,
  requestDetailsFailure,
  requestDetailsSuccess,
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
import { bidMatchedStatus, bidPlacedStatus } from '../job/actions';


/******************** Request List Saga Actions *******************/

function* getRequestList({ }) {
  yield* showLoader(false);
  try {
    const response = yield Request.get(
      apiConfig.getRequest,
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield put(getRequestListSuccess(response.data));
      yield* hideLoader(false, '');
    } else {
      yield* hideLoader(false, '');
      yield put(getRequestListFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getRequestListFailure());
  }
}

/******************** Request List Saga Actions *******************/

function* placeBid({ data }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.placeBid,
      data
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield put(placeBidSuccess(response?.data));
      successToast(response?.message)
      navigate(screenName.homeScreen)
      yield* hideLoader(false, '');
    } else {
      yield* hideLoader(false, '');
      yield put(placeBidFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(placeBidFailure());
  }
}

/******************** Admin Settings Saga Actions *******************/

function* adminData() {
  yield* showLoader(false);
  try {
    const response = yield Request.get(
      apiConfig.adminData,
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield put(adminDataSuccess(response.data));
      yield* hideLoader(false, '');
    } else {
      yield* hideLoader(false, '');
      yield put(adminDataFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(adminDataFailure());
  }
}

function* requestDetails({ data }) {
  yield* showLoader(false);
  try {
    const response = yield Request.get(
      `${apiConfig.requestDetails}${data}`,
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      // Accessing global state
      const reduxState = yield select();
      const {
        bidPlacedData,
        bidMatchedData
      } = reduxState?.jobReducer
      // Destructured response data
      const {
        data
      } = response;
      if (data?.tripStatus == 'bidAcceptedByCustomer') {
        const bidPlacedArray = bidPlacedData.map(item => item?._id === data?._id ? data : item)
        yield put(bidPlacedStatus(bidPlacedArray));
      } else if (data?.tripStatus == 'completed') {
        const bidPlacedArray = bidPlacedData.filter(item => item?._id !== data?._id)
        yield put(bidPlacedStatus(bidPlacedArray));
        yield put(bidMatchedStatus(data));
      } else {
        yield put(requestDetailsSuccess(data));
      }
      yield* hideLoader(false, '');
    } else {
      yield* hideLoader(false, '');
      yield put(requestDetailsFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(requestDetailsFailure());
  }
}

function* sagaHome() {
  yield takeEvery(GET_REQUEST_LIST_START, getRequestList);

  yield takeEvery(PLACE_BID_START, placeBid);

  yield takeEvery(ADMIN_DATA_START, adminData);

  yield takeEvery(REQUEST_DETAILS_START, requestDetails);
}

export default sagaHome;
