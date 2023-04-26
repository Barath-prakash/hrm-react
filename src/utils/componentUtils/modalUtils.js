import useAppContext from 'store/useAppContext';
import {
    CONST_MODULE_DEPARTMENTS,
    CONST_MODULE_DEPARTMENTS_MODAL,
    CONST_MODULE_EMPLOYEES,
    CONST_MODULE_EMPLOYEES_MODAL
} from '../constants';
import { setContextState } from 'utils/contextStoreUtils/setContextUtils';

const useModalUtils = () => {
    const {
        employeesState: { employeesModalOpen },
        employeesMethods: { setEmployeesState },
        departmentsState: { departmentsModalOpen },
        departmentsMethods: { setDepartmentsState }
    } = useAppContext();

    // //** Modal */
    const modalParam = {
        [CONST_MODULE_EMPLOYEES]: CONST_MODULE_EMPLOYEES_MODAL,
        [CONST_MODULE_DEPARTMENTS]: CONST_MODULE_DEPARTMENTS_MODAL
    };

    //** Add new modules state updater functions here */
    const moduleStateSetter = {
        [CONST_MODULE_EMPLOYEES]: setEmployeesState,
        [CONST_MODULE_DEPARTMENTS]: setDepartmentsState
    };

    //** Add new modules states here */
    const moduleState = {
        [CONST_MODULE_EMPLOYEES_MODAL]: employeesModalOpen,
        [CONST_MODULE_DEPARTMENTS]: departmentsModalOpen
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
