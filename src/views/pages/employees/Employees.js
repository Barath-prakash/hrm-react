import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomRowColumns from 'ui-component/CustomRowColumns';
import {
    COMP_CustomCard,
    CONST_ACTION_ADD,
    CONST_DELETE,
    CONST_GET,
    CONST_GETALL,
    CONST_MODULE_EMPLOYEES,
    CONST_MODULE_EMPLOYEES_MODAL,
    CONST_POST,
    CONST_PUT
} from 'utils/constants';
import useAppContext from 'store/useAppContext';
// Pagination
import CustomPagination from 'ui-component/CustomPagination';
import CustomRightButton from 'ui-component/CustomRightButton';
import apiAction from 'utils/apiUtils/apiAction';
import EmployeeForm from './EmployeeForm';
import useModalUtils from 'utils/componentUtils/modalUtils';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(0)
    }
}));

const idName = 'employeeId';
const Employees = () => {
    const classes = useStyles();
    const {
        crudMethods,
        employeesMethods: { setEmployeesState },
        employeesState: { employeesData, page, size, getAllFetching, getFetching }
    } = useAppContext();
    const { handleToggleModal } = useModalUtils();

    const handleApiAction = ({ action, payload, orgId, getId, getIdName, ...rest }) => {
        apiAction({
            crudMethods,
            setState: setEmployeesState,
            module: CONST_MODULE_EMPLOYEES,
            // pass params
            action,
            payload,
            orgId,
            getId,
            getIdName,
            // pagination
            page,
            size,
            ...rest
        });
    };

    useEffect(() => handleApiAction({ action: CONST_GETALL }), [page, size]);

    const refetchAll = () => handleApiAction({ action: CONST_GETALL });

    const get = (getId) => {
        handleApiAction({ action: CONST_GET, getId, idName });
    };

    const postOrPut = (payload) => {
        return handleApiAction({
            action: payload?.[idName] ? CONST_PUT : CONST_POST,
            payload,
            idName,
            isActionOnModal: true,
            refetchAll
        });
    };

    const deleteItem = (delId) => {
        return handleApiAction({
            action: CONST_DELETE,
            payload,
            idName
        });
    };

    return (
        <>
            <CustomRightButton
                action={CONST_ACTION_ADD}
                module={CONST_MODULE_EMPLOYEES}
                handleClick={() =>
                    handleToggleModal({
                        module: CONST_MODULE_EMPLOYEES,
                        modalParam: CONST_MODULE_EMPLOYEES_MODAL
                    })
                }
            />
            <Box className={classes.root}>
                <CustomRowColumns
                    listToLoop={employeesData?.content}
                    componentName={COMP_CustomCard}
                    componentProps={{
                        showStatus: true,
                        showMore: true,
                        componentFor: CONST_MODULE_EMPLOYEES
                    }}
                    get={get}
                    getIdName="employeeId"
                />
                <CustomPagination
                    listData={employeesData}
                    page={page}
                    size={size}
                    setState={setEmployeesState}
                />
                <EmployeeForm postOrPut={postOrPut} />
            </Box>
        </>
    );
};

export default Employees;
