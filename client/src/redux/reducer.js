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

const initialState = {
    loading: false,
    error: '',
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
                description: ""
            }

        ],
        skills: [
            {
                skillName: '',
                keywords: ''
            }
        ],
        projects: [
            {
                projectName: '',
                keywords: '',
                projectDescription: '',
                projectLink: ''
            }
        ],
        achivements: [
            {
                title: '',
                date: '',
                organisation: '',
                description: ''
            }
        ],
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: ''
            }
        case FETCH_DATA_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case POST_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case POST_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: ''
            }
        case POST_DATA_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case UPDATE_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_DATA_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: ''
            }
        case UPDATE_DATA_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default: return state
    }
}

export default reducer