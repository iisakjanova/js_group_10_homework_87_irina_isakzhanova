import {
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    CLEAN_UP_POST_ERROR
} from "../actions/postsActions";

const initialState = {
    posts: [],
    addLoading: false,
    addError: null,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST_REQUEST:
            return {...state, addLoading: true};
        case ADD_POST_SUCCESS:
            return {...state, addLoading: false, addError: null};
        case ADD_POST_FAILURE:
            return {...state, addLoading: false, addError: action.payload};
        case CLEAN_UP_POST_ERROR:
            return {...state, addError: null};
        default:
            return state;
    }
};

export default postsReducer;