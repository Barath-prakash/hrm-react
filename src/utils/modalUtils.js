import useAppContext from 'store/useAppContext';
import {
    CONST_MODULE_EMPLOYEES
    //CONST_MODULE_EMPLOYEES_MODAL
} from './constants';
import { setContextState } from 'store/providers/handlers/utils';

const useModalUtils = () => {
    const {
        employeesState,
        employeesMethods: { setEmployeesState }
    } = useAppContext();

    // //** Modal */
    // const modalParam = {
    //     [CONST_MODULE_EMPLOYEES]: CONST_MODULE_EMPLOYEES_MODAL
    // };

    //** Add new modules state updater functions here */
    const moduleStateSetter = {
        [CONST_MODULE_EMPLOYEES]: setEmployeesState
    };

    //** Add new modules states here */
    const moduleState = {
        [CONST_MODULE_EMPLOYEES]: employeesState
    };

    const handleToggleModal = ({ module, modalParam }) => {
        setContextState({
            setState: moduleStateSetter?.[module],
            paramName: modalParam,
            paramValue: !moduleState?.[modalParam]
        });
    };

    return { handleToggleModal };
};

export default useModalUtils;
