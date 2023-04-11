import React from 'react';
import CustomSlideDialog from 'ui-component/CustomSlideDialog';
import FormBuilder from 'ui-component/forms/FormBuilder';
import { formPostData } from 'ui-component/forms/formUtils';
import useValidateForm from 'ui-component/forms/useValidateForm';
import {
    CONST_TYPE_EMAIL,
    CONST_FIELD_DATE_PICKER,
    CONST_FIELD_RADIO_GROUP,
    CONST_FIELD_SELECT,
    CONST_MODULE_EMPLOYEES
} from 'utils/constants';

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
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' }
            ],
            validationError: ''
        }
    },
    dateOfBirth: {
        fieldLabel: 'DOB',
        fieldName: 'dateOfBirth',
        fieldType: CONST_FIELD_DATE_PICKER,
        options: { isReq: true, md: 6, maxDate: new Date(), validationError: '' }
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
        options: { isReq: true, md: 6, maxDate: new Date(), validationError: '' }
    },
    totalExperience: {
        fieldLabel: 'Total Experience',
        fieldName: 'totalExperience',
        options: { isReq: true, md: 6, validationError: '' }
    },
    designation: { fieldLabel: 'Designation', fieldName: 'designation', options: { md: 6 } },
    department: { fieldLabel: 'Department', fieldName: 'department', options: { md: 6 } },
    status: {
        fieldLabel: 'Status',
        fieldName: 'status',
        fieldValue: 'ACTIVE',
        fieldType: CONST_FIELD_SELECT,
        options: {
            md: 6,
            selectOptions: [
                { label: 'One', value: 1 },
                { label: 'Two', value: 2 }
            ]
        }
    },
    motherTongue: {
        fieldLabel: 'Mother Tongue',
        fieldName: 'motherTongue',
        fieldType: CONST_FIELD_SELECT,
        options: {
            md: 6,
            selectOptions: [
                { label: 'One', value: 1 },
                { label: 'Two', value: 2 }
            ]
        }
    },
    employerOrgId: { fieldName: 'employerOrgId', fieldValue: 0, options: { isNotField: true } }
};

const EmployeeForm = ({ postOrPut }) => {
    const { validateForm } = useValidateForm();

    const handleSubmit = (payload) => {
        const isErrorExist = validateForm(CONST_MODULE_EMPLOYEES, payload);
        if (!isErrorExist) {
            const postData = formPostData(payload);
            console.log('postData', postData);
            // postOrPut(postData);
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
