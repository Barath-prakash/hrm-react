// assets
import { IconKey } from '@tabler/icons';

// constant
const icons = {
    IconKey
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const payroll = {
    id: 'payroll',
    title: 'Employees',
    type: 'group',
    children: [
        {
            id: 'login3',
            title: 'Employees',
            type: 'item',
            url: '/employees',
            target: true
        },
        {
            id: 'register3',
            title: 'Register',
            type: 'item',
            url: '/pages/register/register3',
            target: true
        }
    ]
};

export default payroll;
