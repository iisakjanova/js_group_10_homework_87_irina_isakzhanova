import React, {useEffect, useState} from 'react';
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {Alert} from "@material-ui/lab";

import FormElement from "../UI/FormElement/FormElement";
import ButtonWithProgress from "../UI/ButtonWithProgress/ButtonWithProgress";
import {addComment, cleanUpCommentError} from "../../store/actions/commentsActions";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(3),
    },
}));

const initialState = {
    content: '',
};

const AddComment = ({postId, error, loading}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [comment, setComment] = useState(initialState);

    useEffect(() => {
        dispatch(cleanUpCommentError());
    }, [dispatch]);

    useEffect(() => {
        if (!error && !loading) {
            setComment(initialState);
        }
    }, [error, loading]);

    const handleInputChange = e => {
        const {name, value} = e.target;
        setComment(prev => ({...prev, [name]: value,}));
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        await dispatch(addComment({
            ...comment,
            post: postId,
        }));
    };

    const getFieldError = fieldName => {
        try {
            return error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    return (
        <Grid item>
            <Paper className={classes.root}>
                {
                    error?.global &&
                    <Alert severity="error">
                        {error.global}
                    </Alert>
                }
                <Typography variant="h6" className={classes.title}>Add new comment</Typography>
                <form onSubmit={handleFormSubmit}>
                    <Grid container direction="column" spacing={2}>
                        <FormElement
                            label="Comment"
                            name="content"
                            multiline
                            rows={3}
                            value={comment.content}
                            onChange={handleInputChange}
                            error={getFieldError('content')}
                        />
                        <Grid item>
                            <ButtonWithProgress
                                type="submit"
                                variant="contained"
                                color="primary"
                                loading={loading}
                                disabled={loading}
                            >
                                Send
                            </ButtonWithProgress>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );
};

export default AddComment;