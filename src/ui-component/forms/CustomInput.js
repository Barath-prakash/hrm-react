import React from 'react';
import { TextField } from '@mui/material';

const CustomInput = ({
    module,
    fieldLabel = '',
    fieldName,
    fieldValue,
    options: { validations = [], validationError = '' },
    type,
    handleChange
}) => {
    return (
        <TextField
            fullWidth
            label={fieldLabel}
            placeholder={`Enter ${fieldLabel}`}
            type={type || 'text'}
            InputLabelProps={{
                shrink: true
            }}
            variant="standard"
            id={`${module}_${fieldValue}`}
            name={fieldName}
            value={fieldValue}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            error={!!validationError}
            helperText={validationError || ''}
        />
    );
};

export default CustomInput;
