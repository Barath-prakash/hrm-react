import React from 'react';
import { CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex'
    }
}));

export function CommonLoader({ size = 30, color }) {
    return (
        <CircularProgress color={color || 'secondary'} size={size} style={{ marginRight: 10 }} />
    );
}

export const LoadingCard = ({ size = 30, color }) => (
    <div style={{ padding: 20, textAlign: 'center' }}>
        <CommonLoader size={size} color={color} />
    </div>
);

export default function CustomLoader({ size = 20, style, color }) {
    const classes = useStyles();

    return (
        <div className={classes.root} style={{ ...style }}>
            <CircularProgress
                color={color || 'secondary'}
                size={size}
                style={{ marginRight: 10 }}
            />
        </div>
    );
}
