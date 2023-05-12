import React, { useEffect } from 'react';
import {
    CONST_FIELD_SELECT,
    CONST_MODULE_DEPARTMENTS,
    CONST_MODULE_DESIGNATIONS
} from 'utils/constants';
import FormBuilder from 'utils/formUtils/FormBuilder';
import { formPostData } from 'utils/formUtils/commonUtils';
import useValidateForm from 'utils/formUtils/useValidateForm';
import CustomButton from 'ui-component/CustomButton/CustomButton';
import CustomRowColumns from 'ui-component/CustomRowColumns/CustomRowColumns';
import CustomCard from 'ui-component/CustomCard/CustomCard';
import useStoreAccessByModule from 'utils/contextStoreUtils/useStoreAccessByModule';
import { setContextState } from 'utils/contextStoreUtils/setContextUtils';
import useAppContext from 'store/useAppContext';

const initialState = {
    departmentId: {
        fieldName: 'departmentId',
        fieldLabel: 'Department',
        fieldValue: 0,
        fieldType: CONST_FIELD_SELECT,
        options: { md: 6, isReq: true, validationError: '', selectOptions: [] }
    },
    designationName: {
        fieldName: 'designationtName',
        fieldLabel: 'Name',
        fieldValue: '',
        options: { placeholder: 'Enter Designation Name', isReq: true, validationError: '' }
    },
    designationId: {
        fieldName: 'designationId',
        fieldLabel: 'Designation ID',
        fieldValue: 0,
        options: { isNotField: true }
    }
};

const DesignationForm = ({ postOrPut, designationsOne }) => {
    const {
        departmentsState: { departmentsData }
    } = useAppContext();
    const { getMethodByModule, getStateParamDataByModule } = useStoreAccessByModule();
    const { validateForm } = useValidateForm();
    console.log('*******', useAppContext());

    useEffect(() => {
        initialState.departmentId.options.selectOptions = formatToSelect(departmentsData);
    }, []);
    const formatToSelect = (passList) => {
        return passList.map((el) => ({
            label: el.departmentName,
            value: el.departmentId
        }));
    };
    console.log(formatToSelect);
    const handleSubmit = async () => {
        const { isErrorExist, formState: payload } = validateForm(CONST_MODULE_DESIGNATIONS);
        if (!isErrorExist) {
            const postData = formPostData(payload);
            await postOrPut(postData);
            setContextState({
                setState: getMethodByModule({ module: CONST_MODULE_DESIGNATIONS }),
                paramName: 'formState',
                paramValue: initialState
            });
        }
    };

    const isLoading = ['posting', 'putting'].some(
        (param) =>
            !!getStateParamDataByModule({
                module: CONST_MODULE_DESIGNATIONS,
                passStateParamName: param
            })
    );

    return (
        <CustomRowColumns
            listToLoop={[
                {
                    element: (
                        <CustomCard style={{ padding: 20 }}>
                            <CustomRowColumns
                                listToLoop={[
                                    {
                                        element: (
                                            <FormBuilder
                                                initialState={initialState}
                                                module={CONST_MODULE_DESIGNATIONS}
                                            />
                                        ),
                                        md: 10
                                    },
                                    {
                                        element: (
                                            <CustomButton
                                                handleClick={handleSubmit}
                                                style={{ alignSelf: 'center' }}
                                                name="Save"
                                                loading={isLoading}
                                                showLoader
                                            />
                                        ),
                                        md: 2
                                    }
                                ]}
                            />
                        </CustomCard>
                    ),
                    md: 12
                }
            ]}
        />
    );
};
export default DesignationForm;
