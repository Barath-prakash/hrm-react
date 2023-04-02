import React from 'react';
import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    }
}));

const RowColumnsDOM = (props) => {
    const classes = useStyles();
    const { listToLoop, getShowContent, componentName } = props;

    return (
        <Box className={classes.root}>
            <Grid container spacing={2}>
                {listToLoop?.map((item = {}, i) => (
                    <Grid item xs={12} sm={4} md={3} key={item?.id || i}>
                        {getShowContent(item, componentName)}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RowColumnsDOM;
