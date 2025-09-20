import { all } from 'redux-saga/effects';
import sagaChat from './modules/chat/saga';
import sagaHelp from './modules/help/saga';
import sagaHome from './modules/home/saga';
import sagaLogin from './modules/login/saga';
import sagaNewPassword from './modules/newPassword/saga';
import sagaOrders from './modules/orders/saga';
import sagaPayment from './modules/payment/saga';
import sagaProfile from './modules/profile/saga';
import sagaRegister from './modules/register/saga';
import sagaSendOtp from './modules/sendOtp/saga';
import sagaVerifyOtp from './modules/verifyOtp/saga';
import sagaJob from './modules/job/saga';


export default function* rootSaga() {
  yield all([
    sagaLogin(),
    sagaRegister(),
    sagaSendOtp(),
    sagaVerifyOtp(),
    sagaNewPassword(),
    sagaProfile(),
    sagaHome(),
    sagaHelp(),
    sagaChat(),
    sagaOrders(),
    sagaPayment(),
    sagaJob(),

  ]);
}


