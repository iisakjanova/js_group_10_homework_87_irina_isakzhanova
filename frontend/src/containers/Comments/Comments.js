import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@material-ui/core";

import Preloader from "../../components/UI/Preloader/Preloader";
import {getComments} from "../../store/actions/commentsActions";
import Comment from "../../components/Comment/Comment";

const Comments = ({postId}) => {
    const comments = useSelector(state => state.comments.comments);
    const loading = useSelector(state => state.comments.fetchLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComments(postId));
    }, [dispatch,postId]);

    return (
        <>
            <Preloader loading={loading} />
            <Typography variant="h6">Comments</Typography>
            <Grid container direction="column" spacing={2}>
                {comments?.length > 0
                    ?
                    comments.map(comment => (
                        <Comment
                            key={comment._id}
                            comment={comment}
                        />
                    ))
                    :
                    <Grid item>
                        <Typography variant="subtitle1">No comments yet</Typography>
                    </Grid>
                }
            </Grid>
        </>
    );
};

export default Comments;