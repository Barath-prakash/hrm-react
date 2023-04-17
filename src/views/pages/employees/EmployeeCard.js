import React from 'react';
import { Box, Avatar, CardActionArea, CardContent, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Email, LocalPhone } from '@mui/icons-material';
import CustomStatus from 'ui-component/CustomStatus';
import { dateFormat } from 'utils/commonFunc';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomDropdownMenu from 'ui-component/CustomDropdownMenu/CustomDropdownMenu';
import { CONST_MODULE_EMPLOYEES } from 'utils/constants';

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

const EmployeeCardContent = ({ itemInfo, idName, getItem, deleteItem, getFetching, deleting }) => {
    const classes = useStyles();

    const menuList = [
        {
            action: 'get',
            icon: <EditIcon sx={{ pr: 1 }} />,
            label: 'Edit',
            handleMenuClick: () => {
                getItem(itemInfo?.[idName]);
            },
            isLoading: getFetching
        },
        {
            action: 'delete',
            icon: <DeleteIcon sx={{ pr: 1 }} />,
            label: 'Delete',
            handleMenuClick: () => {
                deleteItem(itemInfo?.[idName]);
            },
            isLoading: deleting
        }
    ];

    return (
        <>
            <Box display="flex" alignItems="center" justifyContent="flex-end" padding={1}>
                <CustomStatus status={itemInfo?.status} />
                <CustomDropdownMenu module={CONST_MODULE_EMPLOYEES} menuList={menuList} />
            </Box>
            <CardActionArea>
                <Box display="flex" alignItems="center" justifyContent="center" padding={1}>
                    <Avatar src={itemInfo.image} sx={{ width: 80, height: 80 }} />
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="subtitle1">{`${itemInfo.name}`}</Typography>
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center" padding={0}>
                    <Typography variant="subtitle2">{itemInfo.designation}</Typography>
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
                                <Typography className={classes.infoHeading} variant="caption">
                                    Department
                                </Typography>
                                <Box>
                                    <Typography variant="caption">{itemInfo.department}</Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.infoHeading}>Date Hired</Typography>
                                <Box>
                                    <Typography variant="caption">
                                        {dateFormat(itemInfo.creationDateTime, 'dd-MMM-yyyy') ||
                                            '--'}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Typography variant="subtitle2" component="p" className={classes.iconText}>
                        <Email fontSize="13" className="mr-5" />
                        {itemInfo.email || '--'}
                    </Typography>
                    <Typography variant="subtitle2" component="p" className={classes.iconText}>
                        <LocalPhone fontSize="13" className="mr-5" />
                        {itemInfo.phoneNumber}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </>
    );
};

export default EmployeeCardContent;
