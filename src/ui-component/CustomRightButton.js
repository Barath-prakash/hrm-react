import React from 'react';
import { Box, Button } from '@mui/material';

const rightAlign = { display: 'flex', justifyContent: 'flex-end', marginBottom: 2 };

const CustomRightButton = ({ onClick }) => {
    return (
        <Box sx={rightAlign}>
            <Button variant="contained" color="primary" onClick={onClick}>
                + New
            </Button>
        </Box>
    );
};

export default CustomRightButton;
