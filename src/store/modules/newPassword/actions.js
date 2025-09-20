import { NEW_PASSWORD, NEW_PASSWORD_SUCCESS, NEW_PASSWORD_FAIL } from './types';

export const newPasswordRequest = (data, navigation) => ({
    type: NEW_PASSWORD,
    data,
    navigation,
});

export const newPasswordSuccess = data => (
    {
        type: NEW_PASSWORD_SUCCESS,
        data
    }
);
export const newPasswordFail = () => (
    {
        type: NEW_PASSWORD_FAIL
    }
);
