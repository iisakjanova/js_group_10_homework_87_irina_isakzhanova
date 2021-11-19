import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    CLEAN_UP_COMMENT_ERROR,
    GET_COMMENTS_FAILURE,
    GET_COMMENTS_REQUEST,
    GET_COMMENTS_SUCCESS
} from "../actions/commentsActions";

const initialState = {
    comments: [],
    addLoading: false,
    addError: null,
    fetchLoading: false,
    fetchError: null,
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT_REQUEST:
            return {...state, addLoading: true};
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                comments: [action.payload, ...state.comments],
                addLoading: false,
                addError: null
            };
        case ADD_COMMENT_FAILURE:
            return {...state, addLoading: false, addError: action.payload};
        case CLEAN_UP_COMMENT_ERROR:
            return {...state, addError: null};
        case GET_COMMENTS_REQUEST:
            return {...state, fetchLoading: true};
        case GET_COMMENTS_SUCCESS:
            return {...state, fetchLoading: false, comments: action.payload, fetchError: null};
        case GET_COMMENTS_FAILURE:
            return {...state, fetchLoading: false, fetchError: action.payload};
        default:
            return state;
    }
};

export default commentsReducer;