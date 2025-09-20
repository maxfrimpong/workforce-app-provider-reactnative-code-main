import { takeEvery, put, call } from 'redux-saga/effects';
import {
  SEND_MESSAGE_START,
} from './types';
import {
  sendMessageFailure,
  sendMessageSuccess,
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

/******************** Send Help Message Saga Actions *******************/

function* sendMessage({ payload, navigation }) {
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
      navigation.goBack();
    } else {
      yield* hideLoader(false, '');
      yield put(sendMessageFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(sendMessageFailure());
  }
}

function* sagaHelp() {
  yield takeEvery(SEND_MESSAGE_START, sendMessage);

}

export default sagaHelp;
