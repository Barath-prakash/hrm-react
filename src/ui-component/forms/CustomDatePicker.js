import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, FormLabel, IconButton, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { add, sub } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const useStyles = makeStyles({
    iconButton: {
        padding: 0,
        '&:hover': {
            backgroundColor: 'transparent'
        }
    }
});

const CustomDatePicker = ({
    fieldLabel,
    handleChange,
    fieldName,
    fieldValue: passSelectedDate,
    minDate,
    maxDate,
    showOnlyMonthAndYear,
    showTimeSelect,
    showDateWithTime,
    minTime,
    maxTime,
    timeIntervals,
    className,
    dateFormat,
    disabled,
    hidePrevNext = true,
    options: { validationError }
}) => {
    const isWeekday = (date) => {
        const day = new Date(date).getDay();
        return day !== 0;
    };

    let format = dateFormat || 'dd/MM/yyyy';
    if (showOnlyMonthAndYear) format = 'MM/yyyy';
    if (showDateWithTime) format = 'dd/MM/yyyy  h:mm aa';

    const classes = useStyles();

    const selectedDate = passSelectedDate ? new Date(passSelectedDate) : null;

    const handleNextPrevChange = (action) => {
        if (action === 'previous') {
            const prevDate = sub(new Date(selectedDate), 'days');
            handleChange(fieldName, prevDate);
        } else if (action === 'next') {
            const nextDate = add(new Date(selectedDate), 'days');
            handleChange(fieldName, nextDate);
        }
    };

    return (
        <Box>
            <ReactDatePicker
                //className={`form-control ${className}`}
                selected={selectedDate}
                onChange={(value) => {
                    handleChange(fieldName, value);
                }}
                minDate={minDate || null}
                maxDate={maxDate || null}
                dateFormat={format}
                placeholderText="Select date..."
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                showMonthYearPicker={!!showOnlyMonthAndYear}
                dropdownMode="select"
                disabled={disabled}
                filterDate={isWeekday}
                showTimeSelect={showTimeSelect}
                minTime={minTime || null}
                maxTime={maxTime || null}
                timeIntervals={timeIntervals}
                customInput={
                    <TextField
                        fullWidth
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
                }
            />
            {!hidePrevNext && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '-5px 0px 0px 5px'
                    }}
                >
                    <IconButton
                        className={classes.iconButton}
                        size="small"
                        disabled={!selectedDate}
                        onClick={() => {
                            handleNextPrevChange('previous');
                        }}
                    >
                        <ExpandLess />
                    </IconButton>
                    <IconButton
                        className={classes.iconButton}
                        size="small"
                        disabled={!selectedDate}
                        onClick={() => {
                            handleNextPrevChange('next');
                        }}
                    >
                        <ExpandMore />
                    </IconButton>
                </div>
            )}
        </Box>
    );
};

export default CustomDatePicker;
