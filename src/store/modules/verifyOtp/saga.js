import { takeEvery, put, call } from 'redux-saga/effects';
import { VERIFY_OTP } from './types';
import { verifyOtpFail, verifyOtpSuccess } from './actions';
import { apiConfig, apiSuccess, errorToast, hideLoader, screenName, showLoader } from '../../../utils';
import axios from 'axios';
import config from "../../../config";
import { registerRequest } from '../register/actions';
import { navigate } from '../../../navigation/RootNavigation';
import { Request } from '../../../services';

var qs = require('qs');


function* onVerifyOtpRequested({ payload, flow, data, navigation }) {
  console.log('verify intiate check for register Data', payload, flow, data,)
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.verifyOtp,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      if (flow === 'register') {
        console.log('register flow initiated', data)
        navigate(screenName.setPassword, { passedData: data })
      } else if (flow === 'forgot') {
        navigation.navigate(screenName.forgot, {
          ...data,
          OTP: payload?.OTP
        })
      }
    } else {
      yield put(verifyOtpFail());
      yield* hideLoader(false, '');
      errorToast(response.data.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    errorToast(error.message)
    yield put(verifyOtpFail());
  }
}

function* sagaVerifyOtp() {
  yield takeEvery(VERIFY_OTP, onVerifyOtpRequested);
}
export default sagaVerifyOtp;
