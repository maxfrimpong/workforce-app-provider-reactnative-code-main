import { takeEvery, put, call, select } from 'redux-saga/effects';
import {
  GET_CHAT_START, GET_MORE_CHAT_START, UPLOAD_MEDIA_START,
} from './types';
import {
  getChatFailure,
  getChatSuccess,
  uploadMediaFailure,
  uploadMediaSuccess,
} from './actions';
import { Request } from "../../../services";
import {
  apiConfig,
  apiSuccess,
  convertToFormData,
  errorToast,
  hideLoader,
  showLoader,
  socketServices,
  successToast
} from '../../../utils';

/******************** Get Chat Saga Actions *******************/

function* getChat({ payload, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.getChat,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      yield* hideLoader(false, '');
      yield put(getChatSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(getChatFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getChatFailure());
  }
}

function* getMoreChat({ payload, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiConfig.sendSupport,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      const reduxState = yield select();
      const { chatData } = reduxState?.chatReducer
      yield* hideLoader(false, '');
      yield put(getChatSuccess(response.data))
    } else {
      yield* hideLoader(false, '');
      yield put(getChatFailure());
      errorToast(response.message)
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getChatFailure());
  }
}

function* uploadMedia({ payload, media }) {
  // Access Global state
  const reduxState = yield select();
  const { chatData } = reduxState?.chatReducer
  let newMedia = media;
  yield put(uploadMediaSuccess([media, ...chatData]))
  try {
    const response = yield Request.post(
      apiConfig.uploadMedia,
      payload
    );
    console.log('response', response)
    if (response.status == apiSuccess) {
      const newArray = chatData.filter(item => item?.media !== media?.media)
      yield put(uploadMediaSuccess(newArray))
      delete newMedia.isLoading;
      newMedia.media = response?.data?.location
      socketServices.emit('sendMessage', newMedia, data => {
        console.log('Sent message', data)
      })
    } else {
      const newArray = chatData.filter(item => item?.media !== media?.media)
      yield put(uploadMediaFailure(newArray));
      errorToast(response.message)
    }
  } catch (error) {
    const newArray = chatData.filter(item => item?.media !== media?.media)
    yield put(uploadMediaFailure(newArray));
  }
}

function* sagaChat() {
  yield takeEvery(GET_CHAT_START, getChat);
  yield takeEvery(GET_MORE_CHAT_START, getMoreChat);
  yield takeEvery(UPLOAD_MEDIA_START, uploadMedia);

}

export default sagaChat;
