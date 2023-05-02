import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CustomRowColumns from 'ui-component/CustomRowColumns/CustomRowColumns';
import {
    CONST_MODULE_DEPARTMENTS,
    COMP_CustomCard,
    CONST_DELETE,
    CONST_GET,
    CONST_GETALL,
    CONST_POST,
    CONST_PUT,
    CONST_LOCAL_STORAGE_LOGGED_USER
} from 'utils/constants';
import useAppContext from 'store/useAppContext';
// Pagination
import CustomPagination from 'ui-component/CustomPagination/CustomPagination';
import apiAction from 'utils/apiUtils/apiAction';
import CustomCard from 'ui-component/CustomCard/CustomCard';
import DepartmentForm from './DepartmentForm';
import { getLocalStorage } from 'utils/commonFunc';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(0)
    }
}));

const idName = 'departmentId';
const Departments = () => {
    const classes = useStyles();
    const {
        crudMethods,
        departmentsMethods: { setDepartmentsState },
        departmentsState: { page, size, getFetching, deleting }
    } = useAppContext();
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
            setState: setDepartmentsState,
            module: CONST_MODULE_DEPARTMENTS,
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

    useEffect(() => {
        handleApiAction({ action: CONST_GETALL });
    }, [page, size]);

    const refetchAll = () => handleApiAction({ action: CONST_GETALL });

    const get = (getId) => {
        handleApiAction({
            action: CONST_GET,
            getId,
            idName
        });
    };

    const postOrPut = (payload) => {
        const { orgId } = getLocalStorage(CONST_LOCAL_STORAGE_LOGGED_USER) || {};
        payload['employeeOrgId'] = orgId;
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

    return (
        <>
            <DepartmentForm postOrPut={postOrPut} />
            <Box className={classes.root}>
                <CustomRowColumns
                    listToLoop={[].map((item, k) => (
                        <CustomCard>
                            <EmployeeCardContent
                                key={k}
                                itemInfo={item}
                                idName="departmentId"
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
                        componentFor: CONST_MODULE_DEPARTMENTS
                    }}
                    get={get}
                    getIdName="departmentId"
                />
                <CustomPagination
                    listData={[]}
                    page={page}
                    size={size}
                    setState={setDepartmentsState}
                />
            </Box>
        </>
    );
};

export default Departments;
