import {
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    CLEAN_UP_POST_ERROR,
    GET_POST_BY_ID_FAILURE,
    GET_POST_BY_ID_REQUEST,
    GET_POST_BY_ID_SUCCESS,
    GET_POSTS_FAILURE,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS
} from "../actions/postsActions";

const initialState = {
    posts: [],
    post: null,
    addLoading: false,
    addError: null,
    fetchLoading: false,
    fetchError: null,
    singleLoading: false,
    singleError: null,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {...state, addLoading: true};
        case ADD_POST_SUCCESS:
            return {...state, addLoading: false, addError: null};
        case ADD_POST_FAILURE:
            return {...state, addLoading: false, addError: action.payload};
        case GET_POSTS_REQUEST:
            return {...state, fetchLoading: true};
        case GET_POSTS_SUCCESS:
            return {...state, fetchLoading: false, posts: action.payload, fetchError: null};
        case GET_POSTS_FAILURE:
            return {...state, fetchLoading: false, fetchError: action.payload};
        case CLEAN_UP_POST_ERROR:
            return {...state, addError: null};
        case GET_POST_BY_ID_REQUEST:
            return {...state, singleLoading: true};
        case GET_POST_BY_ID_SUCCESS:
            return {...state, singleLoading: false, post: action.payload, singleError: null};
        case GET_POST_BY_ID_FAILURE:
            return {...state, singleLoading: false, singleError: action.payload};
        default:
            return state;
    }
};

export default postsReducer;