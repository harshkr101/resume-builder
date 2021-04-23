import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILED
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
                loading: false,
                data: [],
                error: action.payload
            }
        default: return state
    }
}

export default reducer