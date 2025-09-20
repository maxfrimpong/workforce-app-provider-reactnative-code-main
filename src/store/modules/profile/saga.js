import { takeEvery, put, call } from 'redux-saga/effects';
import { UPDATE_PROFILE, UPDATE_PROFILE_IMAGE, CHANGE_PASSWORD, GET_PROFILE_START, } from './types';
import {
  updateProfileFail,
  updateProfileImageFail,
  changePasswordFail,
  getProfileFailure,
} from './actions';
import { Request } from "../../../services";
import {
  apiConfig, apiSuccess, errorToast,
  hideLoader, screenName, showLoader, successToast
} from '../../../utils';
import { loginSuccess } from '../login/actions';

function* onUpdateProfileRequested({ data, navigation }) {
  yield* showLoader(false);
  console.log('data', data)
  try {
    const response = yield Request.post(
      apiConfig.updateProfile,
      data
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(loginSuccess(response.data));
      successToast(response.message)
      navigation.goBack()
    } else {
      yield* hideLoader(false, '');
      yield put(updateProfileFail());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(updateProfileFail());
  }
}

function* onUpdateProfileImageRequested({ data, navigation }) {
  yield* showLoader(false);
  console.log('data', data)
  try {
    const response = yield Request.post(
      apiConfig.uploadDP,
      data
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield put(loginSuccess(response.data));
      yield* hideLoader(false, '');
      successToast(response.message)
    } else {
      yield* hideLoader(false, '');
      yield put(updateProfileImageFail());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(updateProfileImageFail());
  }
}

function* onChangePasswordRequested({ data, navigation }) {
  yield* showLoader(false);
  console.log('data', data)
  try {
    const response = yield Request.post(
      apiConfig.changePassword,
      data
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      successToast(response.message)
      navigation.goBack()
    } else {
      yield* hideLoader(false, '');
      yield put(changePasswordFail());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(changePasswordFail());
  }
}

function* getProfile() {
  try {
    const response = yield Request.get(
      apiConfig.getProfile,
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield put(loginSuccess(response?.data))
    } else {
      yield put(getProfileFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield put(getProfileFailure());
  }
}

function* sagaProfile() {
  yield takeEvery(UPDATE_PROFILE, onUpdateProfileRequested);
  yield takeEvery(UPDATE_PROFILE_IMAGE, onUpdateProfileImageRequested);
  yield takeEvery(CHANGE_PASSWORD, onChangePasswordRequested);
  yield takeEvery(GET_PROFILE_START, getProfile);

}
export default sagaProfile;
