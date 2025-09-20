import { takeEvery, put, call } from 'redux-saga/effects';
import { SEND_OTP } from './types';
import { sendOtpFail, sendOtpSuccess } from './actions';
import { Request } from "../../../services";
import {
  apiConfig,
  apiSuccess,
  errorToast,
  hideLoader,
  screenName,
  showLoader,
  successToast
} from '../../../utils';
import axios from 'axios';
import config from "../../../config";
import { navigate } from '../../../navigation/RootNavigation';
var qs = require('qs');


function* onSendOtpRequested({
  payload,
  data
}) {
  console.log('data passed for flow', data)
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.sendOtp,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      successToast(response.message)
      yield put(sendOtpSuccess(response.data))
      if (data !== null) {
        navigate(screenName.verifyOtp, {
          screenFlow: data?.flow === 'forgot' ? 'forgot' : 'register',
          passedData: data
        })
      }
    } else {
      yield* hideLoader(false, '');
      yield put(sendOtpFail());
    }
  } catch (error) {
    console.log('API error', error)
    yield* hideLoader(false, '');
    yield put(sendOtpFail());
  }
}

function* sagaSendOtp() {
  yield takeEvery(SEND_OTP, onSendOtpRequested);
}
export default sagaSendOtp;
