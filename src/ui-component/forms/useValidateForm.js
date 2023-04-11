import { setContextState } from 'store/providers/handlers/utils';
import useAppContext from 'store/useAppContext';
import { CONST_FIELD_REQUIRED } from './formUtils';
import { CONST_MODULE_EMPLOYEES } from 'utils/constants';

const useValidateForm = () => {
    const {
        //** Employee Module */
        employeesMethods: { setEmployeesState } = {}
        // Import Or Read more module here
    } = useAppContext();

    //** Add new modules state updater functions here */
    const moduleStateSetter = {
        [CONST_MODULE_EMPLOYEES]: setEmployeesState
    };

    const validateForm = (module, formState) => {
        let isErrorExist = false;
        const stateObjList = Object.values(formState).map((el) => {
            if (!isErrorExist) {
                isErrorExist = !!(el.options?.isReq && !el.fieldValue);
            }
            return {
                ...el,
                options: {
                    ...el.options,
                    validationError: el.options?.isReq && !el.fieldValue ? CONST_FIELD_REQUIRED : ''
                }
            };
        });

        const stateObj = {};
        for (const item of stateObjList) {
            stateObj[item.fieldName] = item;
        }

        setContextState({
            setState: moduleStateSetter?.[module],
            paramName: 'formState',
            paramValue: stateObj
        });
        return isErrorExist;
    };

    return { validateForm };
};

export default useValidateForm;
