import axios from 'axios';

import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILED
} from './actionTypes'

export const fetchData = (user, token) => {
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
                dispatch(fetchDataSuccess(data))
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