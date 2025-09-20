import {
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_IMAGE,
    UPDATE_PROFILE_IMAGE_SUCCESS,
    UPDATE_PROFILE_IMAGE_FAIL,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    GET_PROFILE_START,
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILURE,
} from './types';

export const updateProfileRequest = (data, navigation) => ({
    type: UPDATE_PROFILE,
    data,
    navigation,
});
export const updateProfileSuccess = data => (
    {
        type: UPDATE_PROFILE_SUCCESS,
        data
    }
);
export const updateProfileFail = () => (
    {
        type: UPDATE_PROFILE_FAIL
    }
);

export const updateProfileImageRequest = (data, navigation) => ({
    type: UPDATE_PROFILE_IMAGE,
    data,
    navigation,
});
export const updateProfileImageSuccess = data => (
    {
        type: UPDATE_PROFILE_IMAGE_SUCCESS,
        data
    }
);
export const updateProfileImageFail = () => (
    {
        type: UPDATE_PROFILE_IMAGE_FAIL
    }
);

export const changePasswordRequest = (data, navigation) => ({
    type: CHANGE_PASSWORD,
    data,
    navigation,
});
export const changePasswordSuccess = data => (
    {
        type: CHANGE_PASSWORD_SUCCESS,
        data
    }
);
export const changePasswordFail = () => (
    {
        type: CHANGE_PASSWORD_FAIL
    }
);

export const getProfileStart = () => ({
    type: GET_PROFILE_START,
});
export const getProfileSuccess = () => (
    {
        type: GET_PROFILE_SUCCESS,
    }
);
export const getProfileFailure = () => (
    {
        type: GET_PROFILE_FAILURE
    }
);