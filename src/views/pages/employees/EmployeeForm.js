import React from 'react';
import CustomSlideDialog from 'ui-component/CustomSlideDialog';
import FormBuilder from 'ui-component/forms/FormBuilder';
import {
    CONST_TYPE_EMAIL,
    CONST_FIELD_DATE_PICKER,
    CONST_FIELD_RADIO_GROUP,
    CONST_FIELD_SELECT,
    CONST_MODULE_EMPLOYEES
} from 'utils/constants';

const initialState = {
    employeeId: { fieldName: 'employeeId', fieldValue: 0, options: { isNotField: true } },
    name: { fieldLabel: 'Name', fieldName: 'name', options: { isReq: true, md: 6 } },
    email: {
        fieldLabel: 'Email',
        fieldName: 'email',
        type: CONST_TYPE_EMAIL,
        options: { isReq: true, md: 6 }
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
            ]
        }
    },
    dateOfBirth: {
        fieldLabel: 'DOB',
        fieldName: 'dateOfBirth',
        fieldType: CONST_FIELD_DATE_PICKER,
        options: { isReq: true, md: 6 }
    },
    qualification: {
        fieldLabel: 'Qualification',
        fieldName: 'qualification',
        options: { isReq: true, md: 6 }
    },
    phoneNumber: { fieldLabel: 'Phone', fieldName: 'phoneNumber', options: { isReq: true, md: 6 } },
    joiningDateTime: {
        fieldLabel: 'Joining Date',
        fieldName: 'joiningDateTime',
        fieldType: CONST_FIELD_DATE_PICKER,
        options: { isReq: true, md: 6 }
    },
    designation: { fieldLabel: 'Designation', fieldName: 'designation', options: { md: 6 } },
    department: { fieldLabel: 'Department', fieldName: 'department', options: { md: 6 } },
    totalExperience: {
        fieldLabel: 'Total Experience',
        fieldName: 'totalExperience',
        options: { isReq: true, md: 6 }
    },
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

const EmployeeForm = () => {
    return (
        <CustomSlideDialog dialogHeader="Employee" module={CONST_MODULE_EMPLOYEES}>
            <FormBuilder initialState={initialState} module={CONST_MODULE_EMPLOYEES} />
        </CustomSlideDialog>
    );
};

export default EmployeeForm;
