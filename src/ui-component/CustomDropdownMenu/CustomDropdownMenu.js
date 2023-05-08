import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import { CircularProgress, IconButton, MenuItem } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import {
    CONST_APP_CONFIRM_MODAL,
    CONST_APP_CONFIRM_MODAL_HANDLE,
    CONST_DELETE
} from 'utils/constants';
import useAppContext from 'store/useAppContext';
import { setContextState } from 'utils/contextStoreUtils/setContextUtils';
import useStoreAccessByModule from 'utils/contextStoreUtils/useStoreAccessByModule';
import { getTableEditDeleteDomList } from 'ui-component/commonUtilities';

const CustomDropdownMenu = ({ module, getItem, deleteItem }) => {
    const {
        appMethods: { setAppState }
    } = useAppContext();
    const { getStateParamDataByModule } = useStoreAccessByModule();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const updateContext = (paramName, paramValue) => {
        setContextState({
            setState: setAppState,
            paramName,
            paramValue
        });
    };

    const handleClick = (event) => setAnchorEl(event?.currentTarget);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const actionMenuClick = ({ action, handleMenuClick }) => {
        if (action === CONST_DELETE) {
            updateContext(CONST_APP_CONFIRM_MODAL, true);
            updateContext(CONST_APP_CONFIRM_MODAL_HANDLE, handleMenuClick);
        } else if (typeof handleMenuClick === 'function') {
            handleMenuClick?.();
        }
    };

    const getMenuList = () => {
        return getTableEditDeleteDomList({
            getItem,
            getFetching: getStateParamDataByModule({ module, passStateParamName: 'getFetching' }),
            deleteItem,
            deleting: getStateParamDataByModule({ module, passStateParamName: 'deleting' })
        });
    };

    const menuList = getMenuList?.();
    return (
        <>
            <IconButton aria-label="share" onClick={handleClick}>
                <MoreVert />
            </IconButton>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
            >
                {menuList?.map(({ isLoading, icon, label, handleMenuClick, action }, k) => (
                    <MenuItem key={k} onClick={() => actionMenuClick({ action, handleMenuClick })}>
                        {isLoading ? <CircularProgress size={15} sx={{ mr: 1 }} /> : icon}
                        {label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default CustomDropdownMenu;
