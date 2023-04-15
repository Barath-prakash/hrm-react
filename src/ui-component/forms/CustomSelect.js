import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {
    CONST_INPUT_LABEL_SHRINK,
    CONST_INPUT_SIZE,
    CONST_INPUT_VARIANT
} from 'utils/formUtils/commonUtils';

export default function CustomSelect({
    isMulti = false,
    module,
    fieldLabel = '',
    fieldValue,
    fieldName,
    options: { isReq, validations = [], validationError = '', selectOptions },
    handleChange
}) {
    return (
        <Autocomplete
            id={`${module}_${fieldValue}`}
            multiple={isMulti}
            options={selectOptions}
            getOptionLabel={(option) => option.label}
            value={selectOptions?.find((el) => el.value === fieldValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    InputLabelProps={{
                        shrink: CONST_INPUT_LABEL_SHRINK
                    }}
                    variant={CONST_INPUT_VARIANT}
                    size={CONST_INPUT_SIZE}
                    label={fieldLabel}
                    placeholder={`Select ${fieldLabel}`}
                    error={!!validationError}
                    helperText={validationError || ''}
                    required={isReq}
                />
            )}
            onChange={(event, newValue) => {
                if (newValue?.value !== fieldValue) {
                    handleChange(fieldName, newValue?.value);
                }
            }}
        />
    );
}
