import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

import {historyReplace} from "./historyActions";

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const GET_POST_BY_ID_REQUEST = 'GET_POST_BY_ID_REQUEST';
export const GET_POST_BY_ID_SUCCESS = 'GET_POST_BY_ID_SUCCESS';
export const GET_POST_BY_ID_FAILURE = 'GET_POST_BY_ID_FAILURE';

export const CLEAN_UP_POST_ERROR = 'CLEAN_UP_ERROR';

export const addPostRequest = () => ({type: ADD_POST_REQUEST});
export const addPostSuccess = () => ({type: ADD_POST_SUCCESS});
export const addPostFailure = error => ({type: ADD_POST_FAILURE, payload: error});

export const getPostsRequest = () => ({type: GET_POSTS_REQUEST});
export const getPostsSuccess = data => ({type: GET_POSTS_SUCCESS, payload: data});
export const getPostsFailure = error => ({type: GET_POSTS_FAILURE, payload: error});

export const getPostByIdRequest = () => ({type: GET_POST_BY_ID_REQUEST});
export const getPostByIdSuccess = data => ({type: GET_POST_BY_ID_SUCCESS, payload: data});
export const getPostByIdFailure = error => ({type: GET_POST_BY_ID_FAILURE, payload: error});

export const cleanUpPostError = () => ({type: CLEAN_UP_POST_ERROR});

export const addPost = (data) => {
    return async (dispatch, getState) => {
        const headers = {
            'Authorization': getState().users.user && getState().users.user.token
        };

        try {
            dispatch(addPostRequest());
            await axiosApi.post('/posts', data, {headers});
            dispatch(addPostSuccess());
            toast.success('Post created');
            dispatch(historyReplace('/'));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(addPostFailure(error.response.data));
            } else {
                dispatch(addPostFailure({global: 'No internet'}));
            }
        }
    };
};

export const getPosts = () => {
    return async dispatch => {
        try {
            dispatch(getPostsRequest());
            const response = await axiosApi.get('/posts');
            dispatch(getPostsSuccess(response.data));
        } catch (error) {
            dispatch(getPostsFailure(error.message));
            toast.error('Could not fetch post!', {
                theme: 'colored',
            });
        }
    };
};

export const getPostById = (id) => {
    return async dispatch => {
        try {
            dispatch(getPostByIdRequest());
            const response = await axiosApi.get('/posts/' + id);
            dispatch(getPostByIdSuccess(response.data));
        } catch (error) {
            dispatch(getPostByIdFailure(error.message));
            toast.error('Could not fetch post!', {
                theme: 'colored',
            });
        }
    };
};