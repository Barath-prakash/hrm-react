import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import useAppContext from 'store/useAppContext';
import DesignationForm from './DesignationForm';
import { makeStyles } from '@mui/styles';
import CustomTable from 'ui-component/tables/CustomTable';
import {
    CONST_MODULE_DESIGNATIONS,
    CONST_DELETE,
    CONST_GET,
    CONST_GETALL,
    CONST_POST,
    CONST_PUT,
    CONST_MODULE_DEPARTMENTS
} from 'utils/constants';
// Pagination
import apiAction from 'utils/apiUtils/apiAction';
import { formatDataToSelectComponent } from 'utils/commonFunc';
import CustomCard from 'ui-component/CustomCard/CustomCard';
import CustomSelect from 'ui-component/forms/CustomSelect';
import CustomRowColumns from 'ui-component/CustomRowColumns/CustomRowColumns';
import { setContextState } from 'utils/contextStoreUtils/setContextUtils';
import useStoreAccessByModule from 'utils/contextStoreUtils/useStoreAccessByModule';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(0),
        marginTop: 20
    }
}));

const idName = 'designationId';
const Designations = () => {
    const classes = useStyles();
    const {
        crudMethods,
        departmentsState: { departmentsData },
        designationsState: { page, size, designationsData, designationsOne, parentDepartmentId }
    } = useAppContext();
    const { getMethodByModule, getStateParamDataByModule } = useStoreAccessByModule();

    const handleApiAction = ({
        action,
        module,
        setState,
        payload,
        idName,
        orgId,
        getId,
        getIdName,
        delId,
        refetchAll,
        ...rest
    }) => {
        return apiAction({
            crudMethods,
            setState: setState || getMethodByModule({ module: CONST_MODULE_DESIGNATIONS }),
            module: module || CONST_MODULE_DESIGNATIONS,
            // pass params
            action,
            payload,
            orgId,
            idName,
            getId,
            getIdName,
            // pagination
            page,
            size,
            delId,
            refetchAll,
            ...rest,
            // additional
            departmentId: parentDepartmentId
        });
    };

    //******** Department handler section start  ******/
    useEffect(() => {
        handleApiAction({
            action: CONST_GETALL,
            module: CONST_MODULE_DEPARTMENTS,
            setState: getMethodByModule({ module: CONST_MODULE_DEPARTMENTS })
        });
    }, []);

    const updateParentDepartment = (deptId) => {
        setContextState({
            setState: getMethodByModule({
                module: CONST_MODULE_DESIGNATIONS
            }),
            paramName: 'parentDepartmentId',
            paramValue: deptId
        });
    };

    useEffect(() => {
        if (!parentDepartmentId && departmentsData?.length) {
            updateParentDepartment(departmentsData?.[0]?.departmentId);
        }
    }, [JSON.stringify(departmentsData)]);
    //******** Department handler section end  ******/

    useEffect(() => {
        parentDepartmentId && handleApiAction({ action: CONST_GETALL });
    }, [page, size, parentDepartmentId]);

    const refetchAll = () => handleApiAction({ action: CONST_GETALL });

    const get = (getId) => {
        handleApiAction({
            action: CONST_GET,
            getId,
            idName
        });
    };

    const postOrPut = (payload) => {
        payload['departmentId'] = parentDepartmentId;
        return handleApiAction({
            action: payload?.[idName] ? CONST_PUT : CONST_POST,
            payload,
            idName,
            refetchAll
        });
    };

    const deleteItem = (delId) => {
        return handleApiAction({
            action: CONST_DELETE,
            idName,
            delId,
            refetchAll
        });
    };

    const designationKeys = ['designationId', 'designationName'];
    const designationHead = ['Designation ID', 'Designation Name', 'Action'];

    const deptSelectOptions = formatDataToSelectComponent({
        passList: departmentsData,
        labelParam: 'departmentName',
        valueParam: 'departmentId'
    });

    return (
        <>
            <CustomRowColumns
                listToLoop={[
                    {
                        element: (
                            <CustomCard style={{ padding: 16 }}>
                                <CustomSelect
                                    fieldLabel="Main Deparment"
                                    placeholder="Select..."
                                    options={{ selectOptions: deptSelectOptions }}
                                    onChange={updateParentDepartment}
                                    fieldValue={getStateParamDataByModule({
                                        module: CONST_MODULE_DESIGNATIONS,
                                        passStateParamName: 'parentDepartmentId'
                                    })}
                                    clearable
                                />
                            </CustomCard>
                        ),
                        md: 4
                    },
                    {
                        element: (
                            <DesignationForm
                                postOrPut={postOrPut}
                                designationsOne={designationsOne}
                            />
                        ),
                        md: 8
                    }
                ]}
            ></CustomRowColumns>

            <Box className={classes.root}>
                <CustomTable
                    module={CONST_MODULE_DESIGNATIONS}
                    dataList={designationsData}
                    dataKeys={designationKeys}
                    headers={designationHead}
                    idName={idName}
                    deleteItem={deleteItem}
                    getItem={get}
                />
            </Box>
        </>
    );
};
export default Designations;
