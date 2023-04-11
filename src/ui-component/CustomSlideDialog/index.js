import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    Divider,
    IconButton,
    Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { CONST_MODULE_EMPLOYEES, CONST_MODULE_EMPLOYEES_MODAL } from 'utils/constants';
import { setContextState } from 'store/providers/handlers/utils';
import useAppContext from 'store/useAppContext';
import CustomButton from 'ui-component/CustomButton';

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

export default function CustomSlideDialog({
    isForm = false,
    module = '',
    width = '30%',
    children = null,
    dialogHeader = '',
    handleSubmit
}) {
    const {
        employeesState: {
            employeesModalOpen: empModalOpen,
            formState: empFormState,
            posting: empPosting,
            putting: empPutting
        },
        employeesMethods: { setEmployeesState }
    } = useAppContext();

    //** Modal */
    const modalParam = {
        [CONST_MODULE_EMPLOYEES]: CONST_MODULE_EMPLOYEES_MODAL
    };

    //** Add new modules state updater functions here */
    const moduleStateSetter = {
        [CONST_MODULE_EMPLOYEES]: setEmployeesState
    };

    //** Add new modules states here */
    const moduleModalState = {
        [CONST_MODULE_EMPLOYEES]: empModalOpen
    };

    const moduleFormState = {
        [CONST_MODULE_EMPLOYEES]: empFormState
    };

    const moduleLoaderState = {
        [CONST_MODULE_EMPLOYEES]: empPosting || empPutting
    };

    const setToggleModal = () => {
        setContextState({
            setState: moduleStateSetter?.[module],
            paramName: modalParam?.[module],
            paramValue: !moduleModalState?.[module]
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit?.(moduleFormState?.[module]);
    };

    const isModalOpen = moduleModalState?.[module];
    const isLoading = moduleLoaderState?.[module];
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
            {isForm ? (
                <form onSubmit={onSubmit}>
                    <DialogContent>{children}</DialogContent>
                    <Divider />
                    <DialogActions>
                        <CustomButton
                            name="Cancel"
                            handleClick={setToggleModal}
                            loading={isLoading}
                        />
                        <CustomButton type="submit" name="Save" loading={isLoading} />
                    </DialogActions>
                </form>
            ) : (
                <DialogContent>{children}</DialogContent>
            )}
        </StyledDialog>
    );
}
