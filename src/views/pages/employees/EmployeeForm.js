import React from 'react';
import CustomSlideDialog from 'ui-component/CustomSlideDialog';
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
    designation: { fieldLabel: 'Designation', fieldName: 'designation', options: { md: 6 } },
    department: { fieldLabel: 'Department', fieldName: 'department', options: { md: 6 } },
    status: {
        fieldName: 'status',
        fieldValue: 'ACTIVE',
        options: {
            isNotField: true
        }
    },
    motherTongue: {
        fieldLabel: 'Mother Tongue',
        fieldName: 'motherTongue',
        fieldType: CONST_FIELD_SELECT,
        options: {
            md: 6,
            selectOptions: languagesForSelect
        }
    },
    employerOrgId: {
        fieldName: 'employerOrgId',
        fieldValue: orgId || 0,
        options: { isNotField: true }
    }
};

const EmployeeForm = ({ postOrPut, refetchAll }) => {
    const { validateForm } = useValidateForm();

    const handleSubmit = async (payload) => {
        const isErrorExist = validateForm(CONST_MODULE_EMPLOYEES, payload);
        if (!isErrorExist) {
            const postData = formPostData(payload);
            await postOrPut(postData);
            console.log('Done-Fetch-form');
            refetchAll?.();
        }
    };

    return (
        <CustomSlideDialog
            isForm
            dialogHeader="Employee"
            module={CONST_MODULE_EMPLOYEES}
            handleSubmit={handleSubmit}
        >
            <FormBuilder initialState={initialState} module={CONST_MODULE_EMPLOYEES} />
        </CustomSlideDialog>
    );
};

export default EmployeeForm;
