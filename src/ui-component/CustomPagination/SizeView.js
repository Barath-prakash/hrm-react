import { Box, Grid, FormControl, Select, MenuItem, Pagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createNumberListByGivenNumAndSize } from 'utils/commonFunc';

const useStyles = makeStyles({
    formControl: {
        minWidth: 30,
        size: 'small',
        '& .MuiSelect-root, & .MuiInputBase-input': {
            padding: 5,
            paddingRight: 32,
            paddingLeft: 10
        }
    }
});

const SizeViewComponent = ({ listData, size, handleSizeChange }) => {
    const classes = useStyles();

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <span className="mr-8 view-size-color text-bold">View</span>
            <FormControl
                sx={{
                    minWidth: 30,
                    size: 'small'
                }}
                size="small"
                className={classes.formControl}
            >
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={size}
                    onChange={(e) => e.target.value !== size && handleSizeChange?.(e.target.value)}
                >
                    {createNumberListByGivenNumAndSize(listData.totalPages, 10).map((num, i) => (
                        <MenuItem key={i} value={num}>
                            {num}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <span className="ml-8 view-size-color text-bold">per page</span>
        </Box>
    );
};

export default SizeViewComponent;
