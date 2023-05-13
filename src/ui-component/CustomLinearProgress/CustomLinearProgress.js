import { LinearProgress } from '@mui/material';
import React from 'react';
import useAppContext from 'store/useAppContext';

const CustomLinearProgress = () => {
    const {
        employeesState: { getAllFetching: empGetAllFetching, getFetching: empGetFetching } = {},
        departmentsState: { getAllFetching: depGetAllFetching, getFetching: depGetFetching } = {},
        designationsState: { getAllFetching: desGetAllFetching, getFetching: desGetFetching } = {}
    } = useAppContext();

    const loaders = [
        empGetAllFetching,
        // empGetFetching,
        depGetAllFetching,
        // depGetFetching,
        desGetAllFetching
        // desGetFetching
    ];

    const isLoading = loaders.includes(true);

    return isLoading && <LinearProgress />;
};

export default CustomLinearProgress;
