import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function CustomRadioGroup({
    module,
    fieldLabel = '',
    fieldValue,
    fieldName,
    options: { validations = [], validationError = '', selectOptions },
    handleChange
}) {
    return (
        <FormControl error={!!validationError}>
            <FormLabel id={`${module}_${fieldName}`} style={{ fontSize: 11 }}>
                {fieldLabel}
            </FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={fieldValue}
                onChange={(e) => handleChange(fieldName, e.target.value)}
            >
                {selectOptions?.map((el, k) => (
                    <FormControlLabel
                        key={k}
                        value={el?.value}
                        control={
                            <Radio
                                sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 13
                                    }
                                }}
                            />
                        }
                        label={el?.label}
                    />
                ))}
            </RadioGroup>
            {!!validationError && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
}
