import axios from 'axios';

import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILED,
    POST_DATA_REQUEST,
    POST_DATA_SUCCESS,
    POST_DATA_FAILED,
    UPDATE_DATA_REQUEST,
    UPDATE_DATA_SUCCESS,
    UPDATE_DATA_FAILED
} from './actionTypes'

export const fetchData = (token) => {
    console.log(token);
    var user;
    if (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        user = JSON.parse(window.atob(base64));
    }
    else {
        user = {};
    }

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

export const postData = (token, resume) => {
    console.log(token);

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    const user = JSON.parse(window.atob(base64));

    const bodyData = {
        data: resume,
        user: user
    }

    return (dispatch) => {
        dispatch(postDataRequest())

        axios({
            url: 'http://localhost:3000/api/dashboard/resume',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            data: JSON.stringify(bodyData)
        })
            .then(response => {
                const data = response.data
                dispatch(postDataSuccess(data.data))
            })
            .catch(error => {
                dispatch(postDataFailure(error.message))
            })
    }
}

export const postDataRequest = () => {
    return {
        type: POST_DATA_REQUEST
    }
}

export const postDataSuccess = data => {
    return {
        type: POST_DATA_SUCCESS,
        payload: data
    }
}

export const postDataFailure = error => {
    return {
        type: POST_DATA_FAILED,
        payload: error
    }
}

export const updateData = (token, resume) => {

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    const user = JSON.parse(window.atob(base64));

    const bodyData = {
        data: resume,
        user: user
    }
    console.log(token);

    return (dispatch) => {
        dispatch(updateDataRequest())

        axios({
            url: `http://localhost:3000/api/dashboard/resume/${resume._id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
            data: JSON.stringify(bodyData)
        })
            .then(response => {
                const data = response.data
                console.log(data.data);
                dispatch(updateDataSuccess(data.data))
            })
            .catch(error => {
                dispatch(updateDataFailure(error.message))
            })
    }
}

export const updateDataRequest = () => {
    return {
        type: UPDATE_DATA_REQUEST
    }
}

export const updateDataSuccess = data => {
    return {
        type: UPDATE_DATA_SUCCESS,
        payload: data
    }
}

export const updateDataFailure = error => {
    return {
        type: UPDATE_DATA_FAILED,
        payload: error
    }
}