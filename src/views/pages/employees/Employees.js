import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomRowColumns from 'ui-component/CustomRowColumns';
import { CONST_CustomCard, CONST_EMPLOYEES } from 'utils/constants';

const emps = [
    {
        id: 1,
        name: 'John Doe',
        image: 'https://source.unsplash.com/random',
        department: 'Marketing',
        dateHired: 'Jan 1, 2022',
        email: 'johndoe@example.com',
        phone: '555-555-5555',
        status: 'ACTIVE'
    },
    {
        id: 2,
        name: 'Jane Smith',
        image: 'https://source.unsplash.com/random',
        department: 'Sales',
        dateHired: 'Feb 1, 2022',
        email: 'janesmith@example.com',
        phone: '555-555-5555',
        status: 'INACTIVE'
    },
    {
        id: 3,
        name: 'Bob Johnson',
        image: 'https://source.unsplash.com/random',
        department: 'Engineering',
        dateHired: 'Mar 1, 2022',
        email: 'bobjohnson@example.com',
        phone: '555-555-5555',
        status: 'INPROGRESS'
    },
    {
        id: 4,
        name: 'Bob Johnson',
        image: 'https://source.unsplash.com/random',
        department: 'Engineering',
        dateHired: 'Mar 1, 2022',
        email: 'bobjohnson@example.com',
        phone: '555-555-5555',
        status: 'ACTIVE'
    },
    {
        id: 5,
        name: 'Bob Johnson',
        image: 'https://source.unsplash.com/random',
        department: 'Engineering',
        dateHired: 'Mar 1, 2022',
        email: 'bobjohnson@example.com',
        phone: '555-555-5555',
        status: 'ACTIVE'
    },
    {
        id: 6,
        name: 'Bob Johnson',
        image: 'https://source.unsplash.com/random',
        department: 'Engineering',
        dateHired: 'Mar 1, 2022',
        email: 'bobjohnson@example.com',
        phone: '555-555-5555',
        status: 'ACTIVE'
    }
];
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    }
}));

const Employees = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <CustomRowColumns
                listToLoop={emps}
                componentName={CONST_CustomCard}
                componentProps={{ showStatus: true, showMore: true, componentFor: CONST_EMPLOYEES }}
            />
        </Box>
    );
};

export default Employees;
