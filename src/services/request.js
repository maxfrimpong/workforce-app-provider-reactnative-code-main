import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert, View } from 'react-native'
import AxiosInstance from './Intercepter'
import config from '../config';
import { useDispatch, useSelector } from "react-redux";

//Post Request
export async function post(api, data) {
    return AxiosInstance.post(`${config.API_URL}${api}`, data).then((res) => {
        if (res.status == 200 && !res.data.status) {
            return {
                ...res.data,
                status: 'success'
            }
        }
        return res.data
    }).catch(err => err && err.response ? err.response : err)

}

//Get Request
export async function get(api, data) {

    return AxiosInstance.get(`${config.API_URL}${api}`).then((res) => {

        if (res.status == 200 && !res.data.status) {
            return {
                ...res.data,
                status: 'success'
            }
        }
        return res.data
    }).catch(err => err)
}

export async function getWebView(api, data) {

    return AxiosInstance.get(`${config.API_URL}${api}`).then((res) => {
        if (res.status == 200 && !res.data.status) {
            return {
                data: res.data,
                status: 'success'
            }
        }
        return res.data
    }).catch(err => err)
}

//Put Request
export async function put(api, data) {
    return AxiosInstance.put(`${config.API_URL}${api}`, data).then((res) => res.data).catch(err => err.response)
}

//Delete Request
export async function deleteRequest(api, data) {
    return AxiosInstance.delete(`${config.API_URL}${api}`, data).then((res) => res.data).catch(err => err.response)
}

//Get All Request
export async function getAll(data) {

    return Promise.all(data).then((values) => {

        return values
    }).catch((err) => {

        return err
    })
}

// Get Token
export async function getAccessTokenFromCookies() {
    return new Promise(async (resolve, reject) => {
        let token = await AsyncStorage.getItem('token')
        if (token) {
            resolve(token);
        } else {
            reject(true);
        }
    });
}
// Get Language
