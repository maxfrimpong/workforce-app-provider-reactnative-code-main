import { takeEvery, put, call } from 'redux-saga/effects';
import { REGISTER } from './types';
import { registerFail, registerSuccess } from './actions';
import { loginSuccess } from '../login/actions';
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

function* onRegisterRequested({ data, navigation }) {
  yield* showLoader(false);
  console.log('data', data)
  try {
    const response = yield Request.post(
      apiConfig.register,
      data
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      successToast(response.message)
      navigation.navigate(screenName.authThanks)
    } else {
      yield* hideLoader(false, '');
      yield put(registerFail());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(registerFail());
  }
}

function* sagaRegister() {
  yield takeEvery(REGISTER, onRegisterRequested);
}
export default sagaRegister;
