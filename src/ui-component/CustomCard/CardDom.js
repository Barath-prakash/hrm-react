import React from 'react';
import { Box, Avatar, Card, CardActionArea, CardContent, IconButton, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MoreVert } from '@mui/icons-material';
import { CONST_MODULE_EMPLOYEES } from 'utils/constants';
import CustomStatus from 'ui-component/Common/CustomStatus';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    media: {
        height: 250
    },
    content: {
        // backgroundColor: '#f0f0f0',
        paddingBottom: theme.spacing(1)
    },
    infoSection: {
        backgroundColor: '#f4f0fc',
        padding: theme.spacing(2),
        margin: theme.spacing(1),
        borderRadius: 5
    },
    activeButton: {
        padding: 0
    },
    infoHeading: {
        color: 'grey',
        fontSize: 12,
        fontWeight: 'bold'
    }
}));

// componentFor: EMPLOYEES, TAX,

const CardDOM = (props) => {
    const { children, contentDOM, componentFor, customCardInfo, showStatus = false, showMore = false } = props;
    const classes = useStyles();
    return (
        <Card>
            {children || contentDOM || (
                <>
                    <Box display="flex" alignItems="center" justifyContent="flex-end" padding={1}>
                        {showStatus && <CustomStatus status={customCardInfo?.status} />}
                        {showMore && (
                            <IconButton aria-label="share">
                                <MoreVert />
                            </IconButton>
                        )}
                    </Box>
                    <CardActionArea>
                        {componentFor === CONST_MODULE_EMPLOYEES && (
                            <>
                                <Box display="flex" alignItems="center" justifyContent="center" padding={1}>
                                    <Avatar src={customCardInfo.image} sx={{ width: 80, height: 80 }} />
                                </Box>
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    <Typography variant="body1">{customCardInfo.name}</Typography>
                                </Box>
                                <Box display="flex" alignItems="center" justifyContent="center" padding={1}>
                                    <Typography variant="subtitle2">{customCardInfo.department}</Typography>
                                </Box>
                                <CardContent className={classes.infoSection}>
                                    <Box className={classes.content}>
                                        <Grid container direction="row" alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography className={classes.infoHeading}>Department</Typography>
                                                <Box>
                                                    <Typography variant="caption">{customCardInfo.department}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Typography className={classes.infoHeading}>Date Hired</Typography>
                                                <Box>
                                                    <Typography variant="caption">{customCardInfo.dateHired}</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Typography variant="subtitle2" color="textSecondary" component="p">
                                        Email: {customCardInfo.email}
                                    </Typography>
                                    <Typography variant="subtitle2" color="textSecondary" component="p">
                                        Phone: {customCardInfo.phone}
                                    </Typography>
                                </CardContent>
                            </>
                        )}
                    </CardActionArea>
                </>
            )}
        </Card>
    );
};

export default CardDOM;
