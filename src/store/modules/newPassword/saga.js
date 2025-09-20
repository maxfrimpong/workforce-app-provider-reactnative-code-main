import { takeEvery, put, call } from 'redux-saga/effects';
import { NEW_PASSWORD } from './types';
import { newPasswordFail, newPasswordSuccess } from './actions';
import { Request } from "../../../services";
import { apiConfig, apiSuccess, errorToast, hideLoader, screenName, showLoader, successToast } from '../../../utils';

function* onNewPasswordRequested({ data, navigation }) {
  yield* showLoader(false);
  console.log('data', data)
  try {
    const response = yield Request.post(
      apiConfig.newPassword,
      data
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      successToast(response.message)
      navigation.navigate(screenName.login)
    } else {
      yield* hideLoader(false, '');
      yield put(newPasswordFail());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(newPasswordFail());
  }
}

function* sagaNewPassword() {
  yield takeEvery(NEW_PASSWORD, onNewPasswordRequested);
}
export default sagaNewPassword;
