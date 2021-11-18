import React from 'react';
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

import {logoutUser} from "../../../store/actions/usersActions";

const useStyles = makeStyles(theme => ({
    link: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        }
    },
}));

const UserMenu = ({user}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <Typography variant="subtitle1">Hello, <b>{user}</b>!</Typography>
            </Grid>
            <Grid item>
                <Button
                    component={Link}
                    to="/posts/add"
                    className={classes.link}
                >
                    Add new post
                </Button>
            </Grid>
            <Grid item>
                <Button
                    onClick={() => dispatch(logoutUser())}
                    className={classes.link}
                >
                    Logout
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserMenu;