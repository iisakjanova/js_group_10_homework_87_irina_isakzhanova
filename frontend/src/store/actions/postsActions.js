import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

import {historyReplace} from "./historyActions";

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const CLEAN_UP_POST_ERROR = 'CLEAN_UP_ERROR';

export const addPostRequest = () => ({type: ADD_POST_REQUEST});
export const addPostSuccess = () => ({type: ADD_POST_SUCCESS});
export const addPostFailure = error => ({type: ADD_POST_FAILURE, payload: error});

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