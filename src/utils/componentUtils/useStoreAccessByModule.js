import useAppContext from 'store/useAppContext';
import {
    CONST_DELETE,
    CONST_GET,
    CONST_GETALL,
    CONST_MODULE_EMPLOYEES,
    CONST_MODULE_EMPLOYEES_MODAL,
    CONST_POST,
    CONST_PUT
} from 'utils/constants';

export default function useStoreAccessByModule() {
    const {
        employeesState: {
            employeesModalOpen: empModalOpen,
            formState: empFormState,
            posting: empPosting,
            putting: empPutting,
            getAllFetching: empGetAllFetching,
            getFetching: emoGetFetching,
            deleting: empDeleting
        } = {},
        employeesMethods: { setEmployeesState } = {}
    } = useAppContext();

    const moduleModalParam = {
        [CONST_MODULE_EMPLOYEES]: CONST_MODULE_EMPLOYEES_MODAL
    };

    const moduleModalState = {
        [CONST_MODULE_EMPLOYEES]: empModalOpen
    };

    const moduleStateSetter = {
        [CONST_MODULE_EMPLOYEES]: setEmployeesState
    };

    const moduleFormState = {
        [CONST_MODULE_EMPLOYEES]: empFormState
    };

    const moduleLoaderState = {
        [CONST_MODULE_EMPLOYEES]: (loadingAction = CONST_GETALL) => {
            const loaders = {
                [CONST_GETALL]: empGetAllFetching,
                [CONST_GET]: emoGetFetching,
                [CONST_POST]: empPosting,
                [CONST_PUT]: empPutting,
                [CONST_DELETE]: empDeleting
            };
            if (Array.isArray(loadingAction)) {
                return loadingAction.some((loadingParam) => loaders?.[loadingParam]);
            }
            return loaders?.[loadingAction];
        }
    };

    const getModuleStoreAccess = ({ module, accessParam, loadingAction, callFrom = '' }) => {
        const accessStore = {
            moduleSetState: moduleStateSetter?.[module],
            moduleModalParamName: moduleModalParam?.[module],
            moduleModalParamState: moduleModalState?.[module],
            moduleFormState: moduleFormState?.[module],
            moduleLoadingState: moduleLoaderState?.[module]?.(loadingAction)
        };
        return accessParam ? accessStore?.[accessParam] : '';
    };

    return { getModuleStoreAccess };
}
