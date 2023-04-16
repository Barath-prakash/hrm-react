import { LinearProgress } from '@mui/material';
import React from 'react';
import useAppContext from 'store/useAppContext';

const CustomLinearProgress = () => {
    const {
        employeesState: { getAllFetching: empGetAllFetching, getFetching: empGetFetching }
    } = useAppContext();

    const loaders = [empGetAllFetching, empGetFetching];

    const isLoading = loaders.includes(true);

    return isLoading && <LinearProgress />;
};

export default CustomLinearProgress;
