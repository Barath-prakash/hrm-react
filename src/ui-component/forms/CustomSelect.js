import { Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function CustomSelect({
    isMulti = false,
    module,
    fieldLabel = '',
    fieldValue,
    fieldName,
    options: { validations = [], validationError = '', selectOptions },
    handleChange
}) {
    return (
        <Stack spacing={3}>
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
                            shrink: true
                        }}
                        variant="standard"
                        label={fieldLabel}
                        placeholder={`Select ${fieldLabel}`}
                        onChange={handleChange}
                        error={!!validationError}
                        helperText={validationError || ''}
                    />
                )}
                onChange={(event, newValue) => {
                    if (newValue?.value !== fieldValue) {
                        handleChange(fieldName, newValue?.value);
                    }
                }}
            />
        </Stack>
    );
}
