import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    CLEAN_UP_COMMENT_ERROR
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
        default:
            return state;
    }
};

export default commentsReducer;