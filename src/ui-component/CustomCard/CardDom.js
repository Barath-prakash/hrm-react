import React from 'react';
import {
    Box,
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    IconButton,
    Typography,
    Grid
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Email, LocalPhone, MoreVert } from '@mui/icons-material';
import { CONST_MODULE_EMPLOYEES } from 'utils/constants';
import CustomStatus from 'ui-component/CustomStatus';
import { dateFormat } from 'utils/commonFunc';

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
    },
    iconText: { display: 'flex', alignItems: 'center' }
}));

// componentFor: EMPLOYEES, TAX,

const CardDOM = (props) => {
    const {
        children,
        contentDOM,
        componentFor,
        customCardInfo,
        showStatus = false,
        showMore = false,
        get,
        getIdName
    } = props;
    const classes = useStyles();
    return (
        <Card elevation={1}>
            {children || contentDOM || (
                <>
                    <Box display="flex" alignItems="center" justifyContent="flex-end" padding={1}>
                        {showStatus && <CustomStatus status={customCardInfo?.status} />}
                        {showMore && (
                            <IconButton
                                aria-label="share"
                                onClick={() => get(customCardInfo?.[getIdName])}
                            >
                                <MoreVert />
                            </IconButton>
                        )}
                    </Box>
                    <CardActionArea>
                        {componentFor === CONST_MODULE_EMPLOYEES && (
                            <>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    padding={1}
                                >
                                    <Avatar
                                        src={customCardInfo.image}
                                        sx={{ width: 80, height: 80 }}
                                    />
                                </Box>
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    <Typography variant="subtitle1">{`${customCardInfo.name}`}</Typography>
                                </Box>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    padding={0}
                                >
                                    <Typography variant="subtitle2">
                                        {customCardInfo.designation}
                                    </Typography>
                                </Box>
                                <CardContent className={classes.infoSection}>
                                    <Box className={classes.content}>
                                        <Grid
                                            container
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <Grid item>
                                                <Typography
                                                    className={classes.infoHeading}
                                                    variant="caption"
                                                >
                                                    Department
                                                </Typography>
                                                <Box>
                                                    <Typography variant="caption">
                                                        {customCardInfo.department}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item>
                                                <Typography className={classes.infoHeading}>
                                                    Date Hired
                                                </Typography>
                                                <Box>
                                                    <Typography variant="caption">
                                                        {dateFormat(
                                                            customCardInfo.creationDateTime,
                                                            'dd-MMM-yyyy'
                                                        ) || '--'}
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Typography
                                        variant="subtitle2"
                                        component="p"
                                        className={classes.iconText}
                                    >
                                        <Email fontSize="13" className="mr-5" />
                                        {customCardInfo.email || '--'}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        component="p"
                                        className={classes.iconText}
                                    >
                                        <LocalPhone fontSize="13" className="mr-5" />
                                        {customCardInfo.phoneNumber}
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
