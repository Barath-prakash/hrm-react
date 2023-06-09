import { setContextState } from 'utils/contextStoreUtils/setContextUtils';
import PaginationDOM from './PaginationDOM';

const CustomPagination = ({ listData, page, size, setState }) => {
    // setState is belongs to the module (e.g: setAuthState, setEmployeeState)
    const handlePageChange = (event, page) => {
        setContextState({ setState, paramName: 'page', paramValue: page });
    };

    const handleSizeChange = (size) => {
        setContextState({ setState, paramName: 'page', paramValue: 1 });
        setContextState({ setState, paramName: 'size', paramValue: size });
    };

    return (
        !!listData?.totalPages && (
            <PaginationDOM
                {...{ listData, page, size }}
                handlePageChange={handlePageChange}
                handleSizeChange={handleSizeChange}
            />
        )
    );
};

export default CustomPagination;
