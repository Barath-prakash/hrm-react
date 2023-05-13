// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const employees = {
    id: 'employees',
    title: 'Employees',
    type: 'group',
    children: [
        {
            id: 'employees',
            title: 'Employees',
            type: 'item',
            url: '/employees',
            target: true
        }
    ]
};

export default employees;
