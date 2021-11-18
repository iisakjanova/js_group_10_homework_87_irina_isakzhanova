import React, {useRef, useState} from 'react';
import {Grid, Button, TextField, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    input: {
        display: 'none',
    },
});

const FileInput = ({onChange, name, label, error, helperText}) => {
    const classes = useStyles();

    const inputRef = useRef();

    const [filename, setFilename] = useState('');

    const handleFileChange = e => {
        if (e.target.files[0]) {
            setFilename(e.target.files[0].name);
        } else {
            setFilename('');
        }

        onChange(e);
    };

    const activateInput = () => {
        inputRef.current.click();
    };

    return (
        <>
            <input
                type="file"
                name={name}
                className={classes.input}
                onChange={handleFileChange}
                ref={inputRef}
            />
            <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs>
                    <TextField
                        disabled
                        variant="outlined"
                        fullWidth
                        label={label}
                        value={filename}
                        onClick={activateInput}
                        error={error}
                        helperText={helperText}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={activateInput}>Browse</Button>
                </Grid>
            </Grid>
        </>
    );
};

export default FileInput;