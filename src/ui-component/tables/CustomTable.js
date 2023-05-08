import { AssignmentReturn, ElderlyOutlined } from '@mui/icons-material';
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Paper
} from '@mui/material';
import CustomDropdownMenu from 'ui-component/CustomDropdownMenu/CustomDropdownMenu';
import { CONST_MODULE_DEPARTMENTS } from 'utils/constants';

const CustomTable = ({ dataList = [], dataKeys = [], headers = [], menuList = [] }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((el, j) => (
                            <TableCell key={j}>{el}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataList?.map((tableObj, i) => {
                        return (
                            <TableRow key={i}>
                                {dataKeys.map((objKey, i1) => {
                                    return <TableCell key={i1}>{tableObj?.[objKey]}</TableCell>;
                                })}
                                <TableCell>
                                    <CustomDropdownMenu
                                        module={CONST_MODULE_DEPARTMENTS}
                                        menuList={menuList}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CustomTable;
