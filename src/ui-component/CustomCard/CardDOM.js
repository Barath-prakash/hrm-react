import React from 'react';
import { Card } from '@mui/material';

const CardDOM = (props) => {
    const { children, contentDOM } = props;
    return <Card elevation={1}>{children || contentDOM}</Card>;
};

export default CardDOM;
