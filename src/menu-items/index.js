import dashboard from './dashboard';
import employees from './employees';
import payrolls from './payrolls';
import tax from './tax';
import utilities from './utilities';
import other from './other';
import organisation from './organisation';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [dashboard, employees, organisation, payrolls, tax, utilities, other]
};

export default menuItems;
