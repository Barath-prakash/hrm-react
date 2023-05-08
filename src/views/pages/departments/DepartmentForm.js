import { CONST_MODULE_DEPARTMENTS } from 'utils/constants';
import FormBuilder from 'utils/formUtils/FormBuilder';
import { formPostData } from 'utils/formUtils/commonUtils';
import useValidateForm from 'utils/formUtils/useValidateForm';
import CustomButton from 'ui-component/CustomButton/CustomButton';
import CustomRowColumns from 'ui-component/CustomRowColumns/CustomRowColumns';
import CustomCard from 'ui-component/CustomCard/CustomCard';
import useStoreAccessByModule from 'utils/componentUtils/useStoreAccessByModule';

const initialState = {
    departmentId: {
        fieldName: 'departmentId',
        fieldValue: 0,
        options: { isNotField: true }
    },
    departmentName: {
        fieldName: 'departmentName',
        fieldValue: '',
        options: { placeholder: 'Enter Department Name', isReq: true, validationError: '' }
    },
    departmentOrgId: {
        fieldName: 'employerOrgId',
        fieldValue: 0,
        options: { isNotField: true }
    }
};

const DepartmentForm = ({ postOrPut }) => {
    const { validateForm } = useValidateForm();
    const { getStateParamDataByModule } = useStoreAccessByModule();

    const handleSubmit = async () => {
        const { isErrorExist, formState: payload } = validateForm(CONST_MODULE_DEPARTMENTS);
        if (!isErrorExist) {
            const postData = formPostData(payload);
            await postOrPut(postData);
        }
    };

    const isLoading = ['posting', 'putting'].some(
        (param) =>
            !!getStateParamDataByModule({
                module: CONST_MODULE_DEPARTMENTS,
                passStateParamName: param
            })
    );

    //@Note Row is located inside one more row (Check browser)
    // E.g: <Row>
    //         <Col md='6'>Empty Column</Col>
    //         <Col md='6'>
    //           <Card padding='20>
    //             <Row>
    //                 <Col md='10'>
    //                     <FormBuilder />
    //                 </Col>
    //                 <Col md='2'>
    //                     <CustomButton />
    //                 </Col>
    //             </Row>
    //           </Card>
    //         </Col>
    //     </Row>
    return (
        <CustomRowColumns
            listToLoop={[
                { element: null, md: 6 },
                {
                    element: (
                        <CustomCard style={{ padding: 20 }}>
                            <CustomRowColumns
                                listToLoop={[
                                    {
                                        element: (
                                            <FormBuilder
                                                initialState={initialState}
                                                module={CONST_MODULE_DEPARTMENTS}
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
                    md: 6
                }
            ]}
        />
    );
};
export default DepartmentForm;
