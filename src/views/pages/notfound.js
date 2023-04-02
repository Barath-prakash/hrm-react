import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: theme.spacing(3)
    },
    title: {
        marginBottom: theme.spacing(2)
    }
}));

const NotFoundPage = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Typography variant="h4" className={classes.title}>
                404 Page Not Found
            </Typography>
            <Typography variant="subtitle1">The page you are looking for does not exist.</Typography>
        </Box>
    );
};

export default NotFoundPage;
