import useAppContext from 'store/useAppContext';
import { CONST_MODULE_EMPLOYEES, CONST_MODULE_EMPLOYEES_MODAL } from '../constants';
import { setContextState } from 'utils/contextStoreUtils/setContextUtils';

const useModalUtils = () => {
    const {
        employeesState: { employeesModalOpen },
        employeesMethods: { setEmployeesState }
    } = useAppContext();

    // //** Modal */
    const modalParam = {
        [CONST_MODULE_EMPLOYEES]: CONST_MODULE_EMPLOYEES_MODAL
    };

    //** Add new modules state updater functions here */
    const moduleStateSetter = {
        [CONST_MODULE_EMPLOYEES]: setEmployeesState
    };

    //** Add new modules states here */
    const moduleState = {
        [CONST_MODULE_EMPLOYEES_MODAL]: employeesModalOpen
    };

    const handleToggleModal = ({ module, otherModalParam }) => {
        // @TODO: otherModalParam refers to, any other modal param except than main modal param for that module
        setContextState({
            setState: moduleStateSetter?.[module],
            paramName: modalParam?.[module],
            paramValue: !moduleState?.[modalParam?.[module]]
        });
    };

    return { handleToggleModal };
};

export default useModalUtils;
