import React from 'react';
import { Delete, Edit } from '@mui/icons-material';

const getTableEditDeleteDomList = ({ getItem, getFetching, deleteItem, deleting }) => {
    const tableMenuList = [
        {
            action: 'get',
            icon: <Edit sx={{ pr: 1 }} />,
            label: 'Edit',
            handleMenuClick: () => {
                getItem();
            },
            isLoading: getFetching
        },
        {
            action: 'delete',
            icon: <Delete sx={{ pr: 1 }} />,
            label: 'Delete',
            handleMenuClick: () => {
                deleteItem();
            },
            isLoading: deleting
        }
    ];
    return tableMenuList;
};

export { getTableEditDeleteDomList };
