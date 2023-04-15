import React from 'react';
import { TextField } from '@mui/material';
import {
    CONST_INPUT_LABEL_SHRINK,
    CONST_INPUT_SIZE,
    CONST_INPUT_VARIANT
} from 'utils/formUtils/commonUtils';

const CustomInput = ({
    module,
    fieldLabel = '',
    fieldName,
    fieldValue,
    options: { isReq, validations = [], validationError = '' },
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
                shrink: CONST_INPUT_LABEL_SHRINK
            }}
            variant={CONST_INPUT_VARIANT}
            size={CONST_INPUT_SIZE}
            id={`${module}_${fieldValue}`}
            name={fieldName}
            value={fieldValue}
            onChange={(e) => handleChange(fieldName, e.target.value)}
            error={!!validationError}
            helperText={validationError || ''}
            // required={isReq}
        />
    );
};

export default CustomInput;
