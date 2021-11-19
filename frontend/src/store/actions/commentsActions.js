import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const CLEAN_UP_COMMENT_ERROR = 'CLEAN_UP_COMMENT_ERROR';

export const addCommentRequest = () => ({type: ADD_COMMENT_REQUEST});
export const addCommentSuccess = data => ({type: ADD_COMMENT_SUCCESS, payload: data});
export const addCommentFailure = error => ({type: ADD_COMMENT_FAILURE, payload: error});

export const cleanUpCommentError = () => ({type: CLEAN_UP_COMMENT_ERROR});

export const addComment = (data) => {
    return async (dispatch, getState) => {
        const headers = {
            'Authorization': getState().users.user && getState().users.user.token
        };

        try {
            dispatch(addCommentRequest());
            const response = await axiosApi.post('/comments', data, {headers});
            dispatch(addCommentSuccess(response.data));
            toast.success('Comment created');
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(addCommentFailure(error.response.data));
            } else {
                dispatch(addCommentFailure({global: 'No internet'}));
            }
        }
    };
};