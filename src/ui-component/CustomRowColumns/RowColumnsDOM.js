import React from 'react';
import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(0)
    }
}));

const RowColumnsDOM = (props) => {
    const classes = useStyles();
    const { isForm, listToLoop, getShowContent, md, sm = 6, xs = 12 } = props;

    return (
        <Box className={classes.root}>
            <Grid container spacing={isForm ? 3 : 2}>
                {listToLoop?.map((loopItem = {}, i) => (
                    <Grid
                        item
                        sm={loopItem?.sm || sm}
                        xs={loopItem?.xs || xs}
                        md={loopItem?.md || md}
                        key={i}
                    >
                        {getShowContent(loopItem)}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RowColumnsDOM;
