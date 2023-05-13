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
    value = '',
    fieldName,
    options: {
        isReq,
        validations = [],
        validationError = '',
        selectOptions,
        placeholder: optionPlaceHolder
    },
    handleChange,
    onChange,
    onSelect,
    placeholder,
    clearable = false
}) {
    const selected = selectOptions?.find((el) => el?.value === fieldValue || value);
    return (
        <Autocomplete
            id={`${module}_${fieldValue}`}
            multiple={isMulti}
            options={selectOptions}
            getOptionLabel={(option) => option.label}
            value={selected || null}
            renderInput={(params) => (
                <TextField
                    {...params}
                    InputLabelProps={{
                        shrink: CONST_INPUT_LABEL_SHRINK
                    }}
                    variant={CONST_INPUT_VARIANT}
                    size={CONST_INPUT_SIZE}
                    label={fieldLabel}
                    placeholder={optionPlaceHolder || placeholder || `Select ${fieldLabel}`}
                    error={!!validationError}
                    helperText={validationError || ''}
                    // required={isReq}
                />
            )}
            onChange={(event, newValue) => {
                if (newValue?.value !== fieldValue) {
                    handleChange && handleChange?.(newValue?.value, fieldName);
                    onChange && onChange?.(newValue?.value, fieldName);
                    onSelect && onSelect?.(newValue?.value, fieldName);
                }
            }}
            disableClearable={clearable}
        />
    );
}
