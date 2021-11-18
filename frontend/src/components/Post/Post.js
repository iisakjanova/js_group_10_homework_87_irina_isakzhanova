import React from 'react';
import {
    Avatar,
    Grid,
    Link,
    makeStyles,
    Paper,
    Typography
} from "@material-ui/core";
import ForumIcon from '@material-ui/icons/Forum';

import {apiURL} from "../../config";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
    imageWrapper: {
        width: '30%',
        marginRight: theme.spacing(2),
    },
    image: {
        maxHeight: '130px',
        width: '150px',
    },
}));

const Post = (props) => {
    const post = props.post;
    const classes = useStyles();

    let image;

    if (post.image) {
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
        <Grid item>
            <Paper className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item>
                        {image}
                    </Grid>
                    <Grid item>
                        <Grid item container spacing={2}>
                            <Grid item>
                                <Typography variant="subtitle2">{post.datetime}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="subtitle2"> by {post.user.username}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Link
                                component="button"
                                onClick={() => props.onGetFullPost(post._id)}
                            >
                                {post.title}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Post;