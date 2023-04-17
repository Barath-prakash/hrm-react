import React from 'react';
import Button from '@mui/material/Button';
import CustomLoader from '../CustomLoader/CustomLoader';

const CustomButton = ({
    size = 'medium',
    type = 'button',
    loading = false,
    disabled = false,
    handleClick = undefined,
    style = null,
    variant = 'contained',
    color = 'primary',
    name = 'Save',
    className = '',
    fullWidth = false,
    showLoader = false,
    colorSame = false
}) => {
    return (
        <Button
            fullWidth={fullWidth}
            size={size}
            className={className}
            type={type}
            color={colorSame ? color : name.toLowerCase() === 'cancel' ? 'inherit' : color}
            style={{ fontWeight: 'bold', ...style }}
            variant={variant}
            disabled={loading || disabled}
            onClick={handleClick}
        >
            {(type === 'submit' || showLoader) && loading ? <CustomLoader /> : ''}{' '}
            <span>{name}</span>
        </Button>
    );
};

export default CustomButton;
