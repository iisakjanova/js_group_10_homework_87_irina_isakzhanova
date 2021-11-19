import React from 'react';
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}));

const Comment = ({comment}) => {
    const classes = useStyles();

    return (
        <Grid item>
            <Paper className={classes.root}>
                <Grid container direction="column" spacing={3}>
                    <Grid item>
                        <Typography variant="subtitle2">{comment.content}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2"> by {comment.user.username}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Comment;