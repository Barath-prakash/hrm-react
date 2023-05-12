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
    CONST_LOCAL_STORAGE_LOGGED_USER,
    CONST_MODULE_DEPARTMENTS
} from 'utils/constants';

// Pagination
import apiAction from 'utils/apiUtils/apiAction';
import { getLocalStorage } from 'utils/commonFunc';
import CustomRowColumns from 'ui-component/CustomRowColumns/CustomRowColumns';
import CustomSelect from 'ui-component/forms/CustomSelect';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(0),
        marginTop: 20
    }
}));

const idName = 'designationtId';
const Designations = () => {
    const classes = useStyles();
    const {
        crudMethods,
        designationsMethods: { setDesignationsState },
        designationsState: { page, size, designationsData, designationsOne }
    } = useAppContext();
    const handleApiAction = ({
        action,
        module,
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
            setState: setDesignationsState,
            module: module || CONST_MODULE_DESIGNATIONS,
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
        handleApiAction({ action: CONST_GETALL, module: CONST_MODULE_DEPARTMENTS });
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
        payload['designationId'] = orgId;
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
    const designationHead = ['Designation ID', 'Designation Name'];

    return (
        <>
            <DesignationForm postOrPut={postOrPut} designationsOne={designationsOne} />

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
