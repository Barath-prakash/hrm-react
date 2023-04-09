import React from 'react';
import { Box, Button } from '@mui/material';

const rightAlign = { display: 'flex', justifyContent: 'flex-end', marginBottom: 2 };

const CustomRightButton = ({ module, action, handleClick }) => {
    return (
        <Box sx={rightAlign}>
            <Button variant="contained" color="primary" onClick={handleClick}>
                + New
            </Button>
        </Box>
    );
};

export default CustomRightButton;
