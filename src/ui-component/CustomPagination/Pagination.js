import { Pagination } from '@mui/material';

const PaginationComponent = ({ listData, page, handlePageChange }) => {
    return (
        <Pagination
            // variant="outlined"
            color="secondary"
            count={listData.totalPages}
            defaultPage={page}
            page={page}
            showFirstButton
            showLastButton
            onChange={handlePageChange}
        />
    );
};

export default PaginationComponent;
