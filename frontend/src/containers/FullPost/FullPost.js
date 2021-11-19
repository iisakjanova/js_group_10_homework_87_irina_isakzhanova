import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Avatar, Grid, makeStyles, Typography} from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";

import {getPostById} from "../../store/actions/postsActions";
import {apiURL} from "../../config";
import Preloader from "../../components/UI/Preloader/Preloader";

const useStyles = makeStyles(theme => ({
    imageWrapper: {
        width: '30%',
        marginRight: theme.spacing(2),
    },
    image: {
        maxHeight: '130px',
        width: '150px',
    },
}));

const FullPost = ({match}) => {
    const dispatch = useDispatch();
    const id = match.params.id;

    const classes = useStyles();

    useEffect(() => {
        dispatch(getPostById(id));
    }, [dispatch, id]);

    const post = useSelector(state => state.posts.post);
    const loading = useSelector(state => state.posts.singleLoading);

    let message = null;

    if (!post) {
        message = (
            <Typography variant="h4">The post is not found.</Typography>
        );
    }

    let image;

    if (post?.image) {
        const imageUrl = apiURL + '/' + post.image;

        image = (
            <Grid item className={classes.imageWrapper}>
                <img src={imageUrl} className={classes.image} alt={post.title}/>
            </Grid>
        );
    } else {
        image = (
            <Avatar>
                <ForumIcon />
            </Avatar>
        );
    }

    return (
        <>
            <Preloader loading={loading} />
            {message}
            {post && (
                <Grid container direction="column" spacing={3}>
                    <Grid item container spacing={3}>
                        <Grid item>
                            <Typography variant="subtitle1">{post.datetime}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">by {post.user.username}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {image}
                    </Grid>
                    <Grid item>
                        <Typography variant="h5">{post.title}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">{post.description}</Typography>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default FullPost;