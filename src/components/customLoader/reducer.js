import { SHOW_LOADING_VIEW, HIDE_LOADING_VIEW, HIDE_ERROR_MODAL } from './type';

const INITIAL_STATE = {
  loading: false,
  isError: false,
  errorMessage: '',
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_LOADING_VIEW:
      return {
        ...state,
        loading: true,
        isError: action.isError,
        errorMessage: action.errorMessage,
      };
    case HIDE_LOADING_VIEW:
      return {
        ...state,
        loading: false,
        errorMessage: action.errorMessage,
        isError: action.isError,
      };
    case HIDE_ERROR_MODAL:
      return {
        ...state,
        isError: false,
        errorMessage: '',
      };
    default:
      return state;
  }
};
