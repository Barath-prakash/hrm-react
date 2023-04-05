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

export default function SlideDialog({ width, children, dialogHeader }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open dialog
            </Button>
            <StyledDialog open={open} onClose={handleClose} TransitionComponent={Transition} width={width}>
                <DialogTitle>
                    <Typography variant="h4">{dialogHeader || 'Header'}</Typography>
                    <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    {children || (
                        <>
                            <DialogContentText>
                                This is the dialog content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et mattis arcu. Sed
                                eu augue in mi efficitur posuere. Vivamus dictum, leo sit amet pharetra sagittis, ex metus rhoncus nisi, at
                                sollicitudin leo libero vitae justo. Sed non hendrerit sapien. In sed imperdiet odio, vitae auctor enim.
                                Suspendisse potenti. Maecenas finibus mauris ac dolor pretium, eu pharetra felis bibendum. Curabitur maximus
                                lectus quis enim hendrerit imperdiet. Nam luctus, arcu id finibus lobortis, neque diam placerat purus, eu
                                lobortis est augue sed lectus.
                            </DialogContentText>
                        </>
                    )}
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="inherit">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleClose} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </StyledDialog>
        </div>
    );
}
