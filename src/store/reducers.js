import { combineReducers } from 'redux';
import registerReducer from './modules/register/reducer';
import sendOtpReducer from './modules/sendOtp/reducer';
import loadingReducer from '../components/customLoader/reducer';
import verifyOtpReducer from './modules/verifyOtp/reducer';
import loginReducer from "./modules/login/reducer";
import newPasswordReducer from "./modules/newPassword/reducer";
import profileReducer from "./modules/profile/reducer";
import homeReducer from './modules/home/reducer';
import helpReducer from './modules/help/reducer';
import chatReducer from './modules/chat/reducer';
import ordersReducer from './modules/orders/reducer';
import paymentReducer from './modules/payment/reducer';
import jobReducer from './modules/job/reducer';

import storage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const logoutRequest = () => ({
  type: 'LOG_OUT',
});

const appReducer = combineReducers({
  registerReducer,
  sendOtpReducer,
  loadingReducer,
  verifyOtpReducer,
  loginReducer,
  newPasswordReducer,
  profileReducer,
  homeReducer,
  helpReducer,
  chatReducer,
  ordersReducer,
  paymentReducer,
  jobReducer,
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_REQUEST_SUCCESS') {
    // await AsyncStorage.removeItem('fcmToken');
    let fcmToken;
    Object.keys(state).forEach(key => {
      if (key == 'loginReducer') {
        fcmToken = state[key].fcmToken;
      }
      storage.removeItem(`persist:${key}`);
    });
    state = Object.assign(
      {},
      {
        ...initialState,
        loginReducer: { ...initialState.loginReducer, fcmToken: fcmToken },
      },
    );
  }
  return appReducer(state, action);
};

export default rootReducer;
