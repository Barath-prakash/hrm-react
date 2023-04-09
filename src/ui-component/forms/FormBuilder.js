import React from 'react';
import { formObjBuild } from 'utils/formBuilderUtils';
import CustomInput from './CustomInput';
import CustomRowColumns from 'ui-component/CustomRowColumns';
import useAppContext from 'store/useAppContext';
import { useEffect } from 'react';
import { setContextState } from 'store/providers/handlers/utils';
import { CONST_MODULE_EMPLOYEES } from 'utils/constants';

const formElements = {
    INPUT: (formData) => <CustomInput {...formData} />
};

const getElement = (fieldType, formData) => formElements?.[fieldType]?.(formData);

let timer;
const FormBuilder = ({ initialState = {}, module = '' }) => {
    const {
        //** Employee Module */
        employeesState: { formState: empFormState = {} } = {},
        employeesMethods: { setEmployeesState } = {}
        // Import/Read more module here
    } = useAppContext();

    //** Add new modules state updater functions here */
    const moduleStateSetter = {
        [CONST_MODULE_EMPLOYEES]: setEmployeesState
    };

    //** Add new modules states here */
    const moduleState = {
        [CONST_MODULE_EMPLOYEES]: empFormState
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

    console.log('-----formState-----', formState);
    // UI Form building
    const formStateList = Object.keys(formState).map((el) => {
        const formObj = formObjBuild(formState?.[el] || {});
        return (
            formObj?.fieldType && {
                element: getElement(formObj?.fieldType, { ...formObj, module, handleChange }),
                md: formObj.options?.md || 12,
                sm: formObj.options?.md && formObj.options?.md < 7 ? formObj.options?.md * 2 : 12,
                fieldName: formObj.fieldName
            }
        );
    });

    return <CustomRowColumns listToLoop={formStateList.filter((el) => el && el?.element)} />;
};

export default FormBuilder;
