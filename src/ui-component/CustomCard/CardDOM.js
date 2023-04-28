import React from 'react';
import { Card } from '@mui/material';

const CardDOM = (props) => {
    const { children, contentDOM, style } = props;
    return (
        <Card elevation={1} style={style}>
            {children || contentDOM}
        </Card>
    );
};

export default CardDOM;
