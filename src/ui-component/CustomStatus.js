import { Box } from '@mui/material';
import { makeFirstCaps } from 'utils/commonFunc';

const boxStyle = {
    border: `1px solid #6bd098`,
    color: '#228b22',
    borderRadius: '3px',
    fontSize: '12px',
    backgroundColor: '#e2ffde',
    paddingBlock: '0px',
    paddingInline: '7px',
    fontWeight: 'bolder'
};

const deactiveStyle = {
    border: `1px solid #c17c7e`,
    color: `#d44344`,
    borderRadius: '3px',
    fontSize: '12px',
    backgroundColor: '#ffeeee',
    paddingBlock: '0px',
    paddingInline: '7px',
    fontWeight: 'bolder'
};

const statusStyle = {
    border: `1px solid #FFA500`,
    color: '#FF8C00',
    borderRadius: '3px',
    fontSize: '12px',
    backgroundColor: '#FFFFE0',
    paddingBlock: '0px',
    paddingInline: '7px',
    fontWeight: 'bolder'
};

function CustomStatus({ status = '' }) {
    const styles = ['SUCCESS', 'ACTIVE'].includes(status)
        ? boxStyle
        : ['INACTIVE', 'DEACTIVE'].includes(status)
        ? deactiveStyle
        : statusStyle;
    return <Box sx={styles}>{makeFirstCaps(status)}</Box>;
}

export default CustomStatus;
