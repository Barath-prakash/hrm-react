import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import useAppContext from 'store/useAppContext';
import { Alert } from '@mui/material';
import { useEffect } from 'react';

const CustomAlert = ({ open, handleClose, message = '', color = 'success' }) => {
    const { appError } = useAppContext();
    console.log('appError', appError);
    const vertical = 'top';
    const horizontal = 'right';

    useEffect(() => {
        console.log('insideeee--hoool', appError);
    }, [appError]);

    return (
        <Snackbar
            open={!!(appError || open)}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
        >
            <Alert onClose={handleClose} severity={color} sx={{ width: '100%' }}>
                {appError || message}
            </Alert>
        </Snackbar>
    );
};

export default CustomAlert;
