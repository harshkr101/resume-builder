import {
    SET_DATA_SUCCESS,
    SET_DATA_BLANK,
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILED,
    POST_DATA_REQUEST,
    POST_DATA_SUCCESS,
    POST_DATA_FAILED,
    UPDATE_DATA_REQUEST,
    UPDATE_DATA_SUCCESS,
    UPDATE_DATA_FAILED,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILED,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILED,
    RENDER_PREVIEW_SUCCESS,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    DELETE_DATA_REQUEST,
    DELETE_DATA_SUCCESS,
    DELETE_DATA_FAILED,
    SET_TITLE,
    SET_PERSONAL_DETAILS,
    UPDATE_DATA
} from './actionTypes'
import blankResume from '../resume';

const initialState = {
    loading: false,
    error: '',
    token: null,
    image: '',
    data: {
        title: "",
        template: "",
        personal: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            website: ""
        },
        education: [
            {
                university: "",
                degree: "",
                startDate: "",
                endDate: "",
                gpa: ""
            }
        ],
        experience: [
            {
                title: "",
                organisation: "",
                startDate: "",
                endDate: "",
                description: ['']
            }

        ],
        skills: [
            {
                skillName: '',
                keywords: ['']
            }
        ],
        projects: [
            {
                projectName: '',
                keywords: [''],
                projectDescription: [''],
                projectLink: ''
            }
        ],
        achivements: [
            {
                title: '',
                date: '',
                organisation: '',
                description: ['']
            }
        ],
    }
}

const reducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOG_IN_REQUEST:
            return {
                ...newState,
                loading: true,
                error: ''
            }
        case LOG_IN_SUCCESS:
            return {
                ...newState,
                loading: false,
                token: action.payload
            }
        case LOG_IN_FAILED:
            return {
                ...newState,
                loading: false,
                error: action.payload
            }
        case LOG_OUT_REQUEST:
            return {
                ...newState,
                loading: true
            }
        case LOG_OUT_SUCCESS:
            return {
                ...newState,
                data: blankResume,
                image: '',
                loading: false,
                token: action.payload
            }
        case LOG_OUT_FAILED:
            return {
                ...newState,
                loading: false,
                error: action.payload
            }
        case SET_DATA_SUCCESS:
            return {
                ...newState,
                data: state.data[action.payload],
                image: '',
                error: ''
            }
        case SET_DATA_BLANK:
            return {
                ...newState,
                data: initialState.data,
                image: '',
                error: ''
            }
        case FETCH_DATA_REQUEST:
            return {
                ...newState,
                loading: true,
                error: ''
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...newState,
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_DATA_FAILED:
            return {
                ...newState,
                data: blankResume,
                loading: false,
                error: action.payload
            }
        case POST_DATA_REQUEST:
            return {
                ...newState,
                loading: true
            }
        case POST_DATA_SUCCESS:
            return {
                ...newState,
                loading: false,
                data: action.payload,
                error: ''
            }
        case POST_DATA_FAILED:
            return {
                ...newState,
                loading: false,
                error: action.payload
            }
        case UPDATE_DATA_REQUEST:
            return {
                ...newState,
                loading: true
            }
        case UPDATE_DATA_SUCCESS:
            return {
                ...newState,
                loading: false,
                data: action.payload,
                error: ''
            }
        case UPDATE_DATA_FAILED:
            return {
                ...newState,
                loading: false,
                error: action.payload
            }
        case RENDER_PREVIEW_SUCCESS:
            return {
                ...newState,
                image: action.payload
            }
        case UPDATE_USER_REQUEST:
            return {
                ...newState,
                loading: true
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...newState,
                loading: false,
                error: ''
            }
        case UPDATE_USER_FAILED:
            return {
                ...newState,
                loading: false,
                error: action.payload
            }
        case DELETE_DATA_REQUEST:
            return {
                ...newState,
                loading: true
            }
        case DELETE_DATA_SUCCESS:
            return {
                ...newState,
                loading: false,
                error: ''
            }
        case DELETE_DATA_FAILED:
            return {
                ...newState,
                loading: false,
                error: action.payload
            }
        case SET_TITLE:
            return {
                ...newState,
                title: action.payload
            }
        case SET_PERSONAL_DETAILS:
            return {
                ...newState,
                data: action.payload
            }
        case UPDATE_DATA:
            return {
                ...newState,
                data: action.payload
            }
        default: return newState
    }
}

export default reducer