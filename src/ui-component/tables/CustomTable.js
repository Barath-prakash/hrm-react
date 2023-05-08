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

const CustomTable = ({
    module,
    dataList = [],
    dataKeys = [],
    headers = [],
    getItem = undefined,
    deleteItem = undefined,
    idName
}) => {
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
                    {dataList?.map((dataObj, i) => {
                        return (
                            <TableRow key={i}>
                                {dataKeys.map((objKey, i1) => {
                                    return <TableCell key={i1}>{dataObj?.[objKey]}</TableCell>;
                                })}
                                <TableCell>
                                    <CustomDropdownMenu
                                        module={module}
                                        getItem={() => getItem?.(dataObj?.[idName])}
                                        deleteItem={() => deleteItem?.(dataObj?.[idName])}
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
