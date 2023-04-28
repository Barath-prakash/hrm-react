import React from 'react';
import { formObjBuild } from 'utils/formUtils/formBuilderUtils';
import CustomInput from '../../ui-component/forms/CustomInput';
import CustomRowColumns from 'ui-component/CustomRowColumns/CustomRowColumns';
import useAppContext from 'store/useAppContext';
import { useEffect } from 'react';
import { setContextState } from 'utils/contextStoreUtils/setContextUtils';
import { CONST_MODULE_DEPARTMENTS, CONST_MODULE_EMPLOYEES } from 'utils/constants';
import CustomSelect from '../../ui-component/forms/CustomSelect';
import CustomRadioGroup from '../../ui-component/forms/CustomRadioGroup';
import CustomDatePicker from '../../ui-component/forms/CustomDatePicker';
const formElements = {
    INPUT: (formData) => <CustomInput {...formData} />,
    SELECT: (formData) => <CustomSelect {...formData} />,
    MULTI_SELECT: (formData) => <CustomSelect isMulti={true} {...formData} />,
    RADIO_GROUP: (formData) => <CustomRadioGroup {...formData} />,
    DATE_PICKER: (formData) => <CustomDatePicker {...formData} />
};

const getElement = (fieldType, formData) => formElements?.[fieldType]?.(formData);

const FormBuilder = ({ initialState = {}, module = '' }) => {
    const {
        //** Employee Module */
        employeesState: { formState: empFormState = {} } = {},
        employeesMethods: { setEmployeesState } = {},
        departmentsState: { formState: depFormState = {} } = {},
        departmentsMethods: { setDepartmentsState } = {}
        // Import Or Read more module here
    } = useAppContext();

    //** Add new modules state updater functions here */
    const moduleStateSetter = {
        [CONST_MODULE_EMPLOYEES]: setEmployeesState,
        [CONST_MODULE_DEPARTMENTS]: setDepartmentsState
    };

    //** Add new modules states here */
    const moduleState = {
        [CONST_MODULE_EMPLOYEES]: empFormState,
        [CONST_MODULE_DEPARTMENTS]: depFormState
    };

    const updateModuleState = (passValue) => {
        setContextState({
            setState: moduleStateSetter?.[module],
            paramName: 'formState',
            paramValue: passValue
        });
    };

    useEffect(() => {
        updateModuleState(initialState);
    }, [initialState, module]);

    const formState = moduleState?.[module];

    const handleChange = (fieldName, fieldValue) => {
        const newState = {
            ...formState,
            [fieldName]: {
                ...formState?.[fieldName],
                fieldValue
            }
        };
        updateModuleState(newState);
    };

    // UI Form building
    const formStateList = Object.values(formState).map((el) => {
        const formObj = formObjBuild(el || {});
        return (
            formObj?.fieldType && {
                element: getElement(formObj?.fieldType, { ...formObj, module, handleChange }),
                md: formObj.options?.md || 12,
                sm: formObj.options?.md && formObj.options?.md < 7 ? formObj.options?.md * 2 : 12,
                fieldName: formObj.fieldName
            }
        );
    });

    return (
        <CustomRowColumns
            isForm={true}
            listToLoop={formStateList.filter((el) => el && el?.element)}
        />
    );
};

export default FormBuilder;
