import React from 'react';
import {Backdrop, CircularProgress, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Preloader = ({loading}) => {
    const classes = useStyles();

    if (!loading) {
        return null;
    }

    return (
        <Backdrop open={loading} className={classes.backdrop}>
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
};

export default Preloader;