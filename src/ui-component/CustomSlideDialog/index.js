import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    Button,
    Divider,
    IconButton,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { CONST_MODULE_EMPLOYEES } from 'utils/constants';
import { setContextState } from 'store/providers/handlers/utils';
import useAppContext from 'store/useAppContext';

const StyledDialog = styled(Dialog)(({ theme, width }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 0,
        backgroundColor: theme.palette.common.white,
        position: 'fixed',
        top: 0,
        right: 0,
        height: '100%',
        maxHeight: '100%',
        width: `${width}%`,
        maxWidth: `${width}%`,
        margin: 0,
        overflowY: 'auto',
        animation: '$slideRight 0.5s'
    },
    '@keyframes slideRight': {
        '0%': {
            transform: 'translateX(100%)'
        },
        '100%': {
            transform: 'translateX(0)'
        }
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

export default function CustomSlideDialog({ module, width, children, dialogHeader }) {
    const {
        employeesState: { employeesModalOpen: empModalOpen },
        employeesMethods: { setEmployeesState }
    } = useAppContext();

    //** Modal */
    const modalParam = {
        [CONST_MODULE_EMPLOYEES]: 'employeesModalOpen'
    };

    //** Add new modules state updater functions here */
    const moduleStateSetter = {
        [CONST_MODULE_EMPLOYEES]: setEmployeesState
    };

    //** Add new modules states here */
    const moduleState = {
        [CONST_MODULE_EMPLOYEES]: empModalOpen
    };

    const setToggleModal = () => {
        setContextState({
            setState: moduleStateSetter?.[module],
            paramName: modalParam?.[module],
            paramValue: !moduleState?.[module]
        });
    };

    const isModalOpen = moduleState?.[module];
    return (
        <StyledDialog
            open={isModalOpen}
            onClose={setToggleModal}
            TransitionComponent={Transition}
            width={width}
        >
            <DialogTitle>
                <Typography variant="button">{dialogHeader || 'Header'}</Typography>
                <IconButton
                    aria-label="close"
                    onClick={setToggleModal}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent>{children}</DialogContent>
            <Divider />
            <DialogActions>
                <Button onClick={setToggleModal} variant="contained" color="inherit">
                    Cancel
                </Button>
                <Button variant="contained" onClick={setToggleModal} color="primary">
                    Save
                </Button>
            </DialogActions>
        </StyledDialog>
    );
}
