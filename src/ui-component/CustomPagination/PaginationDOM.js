import { Grid } from '@mui/material';
import PaginationComponent from './Pagination';
import SizeViewComponent from './SizeView';

const PaginationDOM = ({ listData, page, size = 10, handlePageChange, handleSizeChange }) => {
    return (
        <Grid container justifyContent="space-between" alignItems="center" className="mr-20">
            <Grid item>
                <SizeViewComponent listData={listData} size={size} handleSizeChange={handleSizeChange} />
            </Grid>
            <Grid item>
                <PaginationComponent listData={listData} page={page} size={size} handlePageChange={handlePageChange} />
            </Grid>
        </Grid>
    );
};

export default PaginationDOM;
