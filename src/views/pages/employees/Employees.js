import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomRowColumns from 'ui-component/CustomRowColumns';
import {
    COMP_CustomCard,
    CONST_ACTION_ADD,
    CONST_GET,
    CONST_GETALL,
    CONST_MODULE_EMPLOYEES
} from 'utils/constants';
import useAppContext from 'store/useAppContext';
// Pagination
import CustomPagination from 'ui-component/CustomPagination';
import CustomRightButton from 'ui-component/CustomRightButton';
import apiAction from 'utils/apiAction';
import EmployeeForm from './EmployeeForm';
import { setContextState } from 'store/providers/handlers/utils';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(0)
    }
}));

const Employees = () => {
    const classes = useStyles();
    const {
        crudMethods,
        employeesMethods: { setEmployeesState },
        employeesState: { employeesData, page, size, getAllFetching, getFetching }
    } = useAppContext();

    const handleApiAction = ({ action, payload, orgId, getId, getIdName }) => {
        apiAction({
            crudMethods,
            setState: setEmployeesState,
            action,
            module: CONST_MODULE_EMPLOYEES,
            page,
            size,
            payload,
            orgId,
            getId,
            getIdName
        });
    };

    useEffect(() => handleApiAction({ action: CONST_GETALL }), [page, size]);

    const get = (getId) => {
        handleApiAction({ action: CONST_GET, getId, getIdName: 'employeeId' });
    };

    const handleToggleModal = () => {
        setContextState({
            setState: setEmployeesState,
            paramName: 'employeesModalOpen',
            paramValue: true
        });
    };

    // console.log({ getAllFetching, getFetching });
    return (
        <>
            <CustomRightButton
                action={CONST_ACTION_ADD}
                module={CONST_MODULE_EMPLOYEES}
                handleClick={handleToggleModal}
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
                <EmployeeForm />
            </Box>
        </>
    );
};

export default Employees;
