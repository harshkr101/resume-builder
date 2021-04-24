import axios from 'axios';

import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILED
} from './actionTypes'

export const fetchData = (token) => {
    console.log(token);

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    const user = JSON.parse(window.atob(base64));

    return (dispatch) => {
        dispatch(fetchDataRequest())

        axios.get(`http://localhost:3000/api/dashboard/resume/all/${user.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        })
            .then(response => {
                const data = response.data
                dispatch(fetchDataSuccess(data.data[0]))
            })
            .catch(error => {
                dispatch(fetchDataFailure(error.message))
            })
    }
}

export const fetchDataRequest = () => {
    return {
        type: FETCH_DATA_REQUEST
    }
}

export const fetchDataSuccess = data => {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data
    }
}

export const fetchDataFailure = error => {
    return {
        type: FETCH_DATA_FAILED,
        payload: error
    }
}