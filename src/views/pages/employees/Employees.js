import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomRowColumns from 'ui-component/CustomRowColumns/CustomRowColumns';
import {
    COMP_CustomCard,
    CONST_ACTION_ADD,
    CONST_APP_MENU,
    CONST_DELETE,
    CONST_GET,
    CONST_GETALL,
    CONST_MODULE_EMPLOYEES,
    CONST_POST,
    CONST_PUT
} from 'utils/constants';
import useAppContext from 'store/useAppContext';
// Pagination
import CustomPagination from 'ui-component/CustomPagination/CustomPagination';
import CustomRightButton from 'ui-component/CustomRightButton';
import apiAction from 'utils/apiUtils/apiAction';
import EmployeeForm from './EmployeeForm';
import useModalUtils from 'utils/componentUtils/modalUtils';
import EmployeeCardContent from './EmployeeCard';
import CustomCard from 'ui-component/CustomCard/CustomCard';

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
        employeesState: { employeesData, page, size, getFetching, employeesOne, deleting }
    } = useAppContext();
    const { handleToggleModal } = useModalUtils();

    const toggleModal = () => {
        handleToggleModal({
            module: CONST_MODULE_EMPLOYEES
        });
    };

    const handleApiAction = ({
        action,
        payload,
        orgId,
        getId,
        getIdName,
        delId,
        refetchAll,
        ...rest
    }) => {
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
            delId,
            refetchAll,
            ...rest
        });
    };

    useEffect(() => handleApiAction({ action: CONST_GETALL }), [page, size]);

    const refetchAll = () => handleApiAction({ action: CONST_GETALL });

    const get = (getId) => {
        handleApiAction({
            action: CONST_GET,
            getId,
            idName,
            toggleModal
        });
    };

    const postOrPut = (payload) => {
        return handleApiAction({
            action: payload?.[idName] ? CONST_PUT : CONST_POST,
            payload,
            idName,
            toggleModal,
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

    return (
        <>
            <CustomRightButton
                action={CONST_ACTION_ADD}
                module={CONST_MODULE_EMPLOYEES}
                handleClick={() => {
                    toggleModal();
                }}
            />
            <Box className={classes.root}>
                <CustomRowColumns
                    listToLoop={employeesData?.content?.map((item, k) => (
                        <CustomCard>
                            <EmployeeCardContent
                                key={k}
                                itemInfo={item}
                                idName="employeeId"
                                getItem={get}
                                deleteItem={deleteItem}
                                getFetching={getFetching}
                                deleting={deleting}
                            />
                        </CustomCard>
                    ))}
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
                <EmployeeForm postOrPut={postOrPut} employeesOne={employeesOne} />
            </Box>
        </>
    );
};

export default Employees;
