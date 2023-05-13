// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const organisation = {
    id: 'organisation',
    title: 'Organisation',
    type: 'group',
    children: [
        {
            id: 'departments',
            title: 'Departments',
            type: 'item',
            url: '/departments',
            target: true
        },
        {
            id: 'designations',
            title: 'Designations',
            type: 'item',
            url: '/designations',
            target: true
        }
    ]
};

export default organisation;
