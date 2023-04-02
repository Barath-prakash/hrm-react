// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://hrm.innobs.in" target="_blank" underline="hover">
            HRM
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://innobs.in" target="_blank" underline="hover">
            by Innobs
        </Typography>
    </Stack>
);

export default AuthFooter;
