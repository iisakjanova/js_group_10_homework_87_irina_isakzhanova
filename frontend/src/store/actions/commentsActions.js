import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const GET_COMMENTS_REQUEST = 'GET_COMMENTS_REQUEST';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';

export const CLEAN_UP_COMMENT_ERROR = 'CLEAN_UP_COMMENT_ERROR';

export const addCommentRequest = () => ({type: ADD_COMMENT_REQUEST});
export const addCommentSuccess = data => ({type: ADD_COMMENT_SUCCESS, payload: data});
export const addCommentFailure = error => ({type: ADD_COMMENT_FAILURE, payload: error});

export const getCommentsRequest = () => ({type: GET_COMMENTS_REQUEST});
export const getCommentsSuccess = data => ({type: GET_COMMENTS_SUCCESS, payload: data});
export const getCommentsFailure = error => ({type: GET_COMMENTS_FAILURE, payload: error});

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

export const getComments = (id) => {
    return async dispatch => {
        try {
            dispatch(getCommentsRequest());
            const response = await axiosApi.get(`/comments?post=${id}`);
            dispatch(getCommentsSuccess(response.data));
        } catch (error) {
            dispatch(getCommentsFailure(error.message));
            toast.error('Could not fetch comments!', {
                theme: 'colored',
            });
        }
    };
};