import React, {useEffect, useState} from 'react';
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "@material-ui/lab";

import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";
import FileInput from "../../components/UI/FileInput/FileInput";
import {addPost, cleanUpPostError} from "../../store/actions/postsActions";
import FormElement from "../../components/UI/FormElement/FormElement";
import {Redirect} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(3),
    },
    alert: {
        marginTop: theme.spacing(3),
        width: "100%",
    },
}));

const initialState = {
    title: '',
    description: '',
    image: null,
};

const AddPost = ({history}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const error = useSelector(state => state.posts.addError);
    const loading = useSelector(state => state.posts.addLoading);
    const user = useSelector(state => state.users.user);

    const [post, setPost] = useState(initialState);

    useEffect(() => {
        dispatch(cleanUpPostError());
    }, [dispatch]);

    if (!user) {
        const path = history.location.pathname + history.location.search;

        return <Redirect to={{
            pathname: "/login",
            state: {nextpath: path}
        }} />
    }

    const handleInputChange = e => {
        const {name, value} = e.target;
        setPost(prev => ({...prev, [name]: value}));
    };

    const handleFileChange = e => {
        const name = e.target.name;
        const file = e.target.files[0];
        setPost(prev => ({...prev, [name]: file}));
    };

    const handleFormSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(post).forEach(key => {
            formData.append(key, post[key]);
        });

        dispatch(addPost(formData));
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
                <Typography variant="h6" className={classes.title}>Add new post</Typography>
                {
                    error?.global &&
                    <Alert severity="error" className={classes.alert}>
                        {error.global}
                    </Alert>
                }
                <form onSubmit={handleFormSubmit}>
                    <Grid container direction="column" spacing={2}>
                        <FormElement
                            label="Title"
                            name="title"
                            value={post.title}
                            onChange={handleInputChange}
                            error={getFieldError('title')}
                        />
                        <FormElement
                            label="Description"
                            name="description"
                            multiline
                            rows={5}
                            value={post.description}
                            onChange={handleInputChange}
                            error={getFieldError('description')}
                        />
                        <Grid item xs>
                            <FileInput
                                label="Image"
                                name="image"
                                onChange={handleFileChange}
                                error={Boolean(getFieldError('image'))}
                                helperText={getFieldError('image')}
                            />
                        </Grid>
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

export default AddPost;