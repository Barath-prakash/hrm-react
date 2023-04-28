import { CONST_MODULE_DEPARTMENTS } from 'utils/constants';
import FormBuilder from 'utils/formUtils/FormBuilder';
import { formPostData } from 'utils/formUtils/commonUtils';
import useValidateForm from 'utils/formUtils/useValidateForm';
import CustomButton from 'ui-component/CustomButton/CustomButton';

const departmentState = {
    departmentId: {
        fieldName: 'departmentId',
        fieldValue: 0,
        options: { isNotField: true }
    },
    departmentName: {
        fieldName: 'departmentName',
        fieldValue: '',
        options: { isReq: true, validationError: '' }
    },
    departmentOrgId: {
        fieldName: 'employeeOrgId',
        fieldValue: 0,
        options: { isNotField: true }
    }
};

const DepartmentForm = () => {
    const { validateForm } = useValidateForm();

    const depHandleSubmit = async (payload) => {
        const isErrorExist = validateForm(CONST_MODULE_DEPARTMENTS, payload);
        if (!isErrorExist) {
            const postData = formPostData(payload);
            await postOrPut(postData);
        }
    };
    return (
        <>
            <FormBuilder initialState={departmentState} module={CONST_MODULE_DEPARTMENTS} />
            <CustomButton onClick={depHandleSubmit}>Save</CustomButton>
        </>
    );
};
export default DepartmentForm;
