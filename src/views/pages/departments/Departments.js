import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
    CONST_MODULE_DEPARTMENTS,
    CONST_DELETE,
    CONST_GET,
    CONST_GETALL,
    CONST_POST,
    CONST_PUT,
    CONST_LOCAL_STORAGE_LOGGED_USER
} from 'utils/constants';
import useAppContext from 'store/useAppContext';
// Pagination
import apiAction from 'utils/apiUtils/apiAction';
import DepartmentForm from './DepartmentForm';
import { getLocalStorage } from 'utils/commonFunc';
import CustomTable from 'ui-component/tables/CustomTable';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(0),
        marginTop: 20
    }
}));

const idName = 'departmentId';
const Departments = () => {
    const classes = useStyles();
    const {
        crudMethods,
        departmentsMethods: { setDepartmentsState },
        departmentsState: { page, size, departmentsData, departmentsOne }
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
        return apiAction({
            crudMethods,
            setState: setDepartmentsState,
            module: CONST_MODULE_DEPARTMENTS,
            // pass params
            action,
            payload,
            orgId,
            getId,
            getIdName,
            // `pagination`
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
        payload['employerOrgId'] = orgId;
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

    const tableKeys = ['departmentId', 'departmentName'];
    const tableHead = ['Department ID', 'Department Name', 'Action'];
    return (
        <>
            <DepartmentForm postOrPut={postOrPut} departmentsOne={departmentsOne} />
            <Box className={classes.root}>
                <CustomTable
                    module={CONST_MODULE_DEPARTMENTS}
                    dataList={departmentsData}
                    dataKeys={tableKeys}
                    headers={tableHead}
                    idName={idName}
                    deleteItem={deleteItem}
                    getItem={get}
                />
            </Box>
        </>
    );
};

export default Departments;
