import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import useAppContext from 'store/useAppContext';
import { setContextState } from 'utils/contextStoreUtils/setContextUtils';
import { CONST_APP_CONFIRM_MODAL } from 'utils/constants';
import CustomButton from 'ui-component/CustomButton/CustomButton';

function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

export default function CustomConfirmDialog() {
    const {
        appMethods: { setAppState },
        appState: { isConfirmModalOpen, message, handleAppConfirmModal }
    } = useAppContext();

    const handleCloseClick = () => {
        setContextState({
            setState: setAppState,
            paramName: CONST_APP_CONFIRM_MODAL,
            paramValue: false
        });
    };

    const handleConfirmClick = () => {
        handleCloseClick();
        handleAppConfirmModal?.();
    };

    return (
        <Dialog
            open={isConfirmModalOpen}
            onClose={handleCloseClick}
            PaperComponent={PaperComponent}
            // aria-labelledby="draggable-dialog-title"
            // autoFocus={false}
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                <span style={{ fontSize: 15 }}>Confirm</span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message || 'Are you sure you want to delete?'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <CustomButton
                    variant="text"
                    color="primary"
                    name="Cancel"
                    handleClick={handleCloseClick}
                    colorSame={true}
                />
                <CustomButton
                    variant="text"
                    color="primary"
                    name="Delete"
                    handleClick={handleConfirmClick}
                />
            </DialogActions>
        </Dialog>
    );
}
