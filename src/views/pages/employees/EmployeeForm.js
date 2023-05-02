import React, { useEffect } from 'react';
import CustomSlideDialog from 'ui-component/CustomSlideDialog/CustomSlideDialog';
import FormBuilder from 'utils/formUtils/FormBuilder';
import { formPostData } from 'utils/formUtils/commonUtils';
import useValidateForm from 'utils/formUtils/useValidateForm';
import { getLocalStorage } from 'utils/commonFunc';
import {
    CONST_TYPE_EMAIL,
    CONST_FIELD_DATE_PICKER,
    CONST_FIELD_RADIO_GROUP,
    CONST_FIELD_SELECT,
    CONST_MODULE_EMPLOYEES,
    CONST_LOCAL_STORAGE_LOGGED_USER
} from 'utils/constants';
import { languagesForSelect } from 'utils/variables';
import { setContextState } from 'utils/contextStoreUtils/setContextUtils';
import useStoreAccessByModule from 'utils/componentUtils/useStoreAccessByModule';

const { orgId } = getLocalStorage(CONST_LOCAL_STORAGE_LOGGED_USER) || {};
const initialState = {
    employeeId: { fieldName: 'employeeId', fieldValue: 0, options: { isNotField: true } },
    name: {
        fieldLabel: 'Name',
        fieldName: 'name',
        options: { isReq: true, md: 6, validationError: '' }
    },
    email: {
        fieldLabel: 'Email',
        fieldName: 'email',
        type: CONST_TYPE_EMAIL,
        options: { isReq: true, md: 6, validationError: '' }
    },
    gender: {
        fieldLabel: 'Gender',
        fieldName: 'gender',
        fieldType: CONST_FIELD_RADIO_GROUP,
        options: {
            isReq: true,
            md: 6,
            selectOptions: [
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' }
            ],
            validationError: ''
        }
    },
    dateOfBirth: {
        fieldLabel: 'DOB',
        fieldName: 'dateOfBirth',
        fieldType: CONST_FIELD_DATE_PICKER,
        options: {
            isReq: true,
            md: 6,
            maxDate: new Date(),
            validationError: '',
            convertToTimestamp: true
        }
    },
    qualification: {
        fieldLabel: 'Qualification',
        fieldName: 'qualification',
        options: { isReq: true, md: 6, validationError: '' }
    },
    phoneNumber: {
        fieldLabel: 'Phone',
        fieldName: 'phoneNumber',
        options: { isReq: true, md: 6, validationError: '' }
    },
    joiningDateTime: {
        fieldLabel: 'Joining Date',
        fieldName: 'joiningDateTime',
        fieldType: CONST_FIELD_DATE_PICKER,
        options: {
            isReq: true,
            md: 6,
            maxDate: new Date(),
            validationError: '',
            convertToTimestamp: true
        }
    },
    totalExperience: {
        fieldLabel: 'Total Experience',
        fieldName: 'totalExperience',
        options: { isReq: true, md: 6, validationError: '' }
    },
    department: {
        fieldLabel: 'Department',
        fieldName: 'department',
        options: { isReq: true, md: 6, validationError: '' }
    },
    motherTongue: {
        fieldLabel: 'Mother Tongue',
        fieldName: 'motherTongue',
        fieldType: CONST_FIELD_SELECT,
        options: {
            md: 6,
            selectOptions: languagesForSelect,
            isReq: true,
            validationError: ''
        }
    },
    designation: {
        fieldLabel: 'Designation',
        fieldName: 'designation',
        options: { md: 6, isReq: true, validationError: '' }
    },
    status: {
        fieldName: 'status',
        fieldValue: 'ACTIVE',
        options: {
            isNotField: true
        }
    },
    employerOrgId: {
        fieldName: 'employerOrgId',
        fieldValue: orgId || 0,
        options: { isNotField: true }
    }
};

const formStateByData = (passData) => {
    const formDataList = Object.values(initialState).map((el) => {
        return {
            ...el,
            fieldValue: passData?.[el?.fieldName]
        };
    });
    const formObj = {};
    formDataList.forEach((formEl) => {
        formObj[formEl.fieldName] = formEl;
    });
    return formObj;
};

const EmployeeForm = ({ postOrPut, employeesOne }) => {
    const { validateForm } = useValidateForm();
    const { getMethodByModule, getStateParamDataByModule } = useStoreAccessByModule();

    useEffect(() => {
        if (employeesOne?.employeeId) {
            setContextState({
                setState: getMethodByModule({ module: CONST_MODULE_EMPLOYEES }),
                paramName: 'formState',
                paramValue: formStateByData(employeesOne)
            });
        }
    }, [employeesOne?.employeeId, JSON.stringify(employeesOne)]);

    const handleSubmit = async () => {
        const { isErrorExist, formState: payload } = validateForm(CONST_MODULE_EMPLOYEES);
        if (!isErrorExist) {
            const postData = formPostData(payload);
            await postOrPut(postData);
        }
    };

    const formState = getStateParamDataByModule({
        module: CONST_MODULE_EMPLOYEES,
        passStateParamName: 'formState'
    });
    return (
        <CustomSlideDialog
            isForm
            dialogHeader="Employee"
            module={CONST_MODULE_EMPLOYEES}
            handleSubmit={handleSubmit}
        >
            <FormBuilder
                initialState={employeesOne?.employeeId ? formState : initialState}
                module={CONST_MODULE_EMPLOYEES}
            />
        </CustomSlideDialog>
    );
};

export default EmployeeForm;
