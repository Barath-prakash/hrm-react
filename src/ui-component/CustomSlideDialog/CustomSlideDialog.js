import React from 'react';
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
import { CONST_MODULE_EMPLOYEES, CONST_POST, CONST_PUT } from 'utils/constants';
import { setContextState } from 'utils/contextStoreUtils/setContextUtils';
import CustomButton from 'ui-component/CustomButton/CustomButton';
import useStoreAccessByModule from 'utils/componentUtils/useStoreAccessByModule';

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
    module = '',
    isForm = false,
    width = '30%',
    children = null,
    dialogHeader = '',
    handleSubmit
}) {
    const { getMethodByModule, getStateParamDataByModule } = useStoreAccessByModule();

    const modalParamName = `${module.toLowerCase()}ModalOpen`;
    const setToggleModal = () => {
        setContextState({
            setState: getMethodByModule({ module }),
            paramName: modalParamName,
            paramValue: !getStateParamDataByModule({ module, passStateParamName: modalParamName })
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit?.();
    };

    const isModalOpen = getStateParamDataByModule({ module, passStateParamName: modalParamName });
    const isLoading = ['posting', 'putting'].some(
        (param) => !!getStateParamDataByModule({ module, passStateParamName: param })
    );

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
