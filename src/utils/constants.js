import { API_EMPLOYEES } from './apis';

// localstorage
const LOCAL_STORAGE_LOGGED_USER = 'loggedUser';

// components
const COMP_CustomCard = 'CustomCard';

// constants
const CONST_EMPLOYEES = 'EMPLOYEES';

const APIS = {
    EMPLOYEES: { apis: API_EMPLOYEES, loadingParam: '', stateParam: '', pageParam: '' }
};

// operation
// args: {
//     module
//     url,
//** data **** */
//     payload,
//     pagination: { page: 1, size: 10 },
//** context params **** */
//     loadingParam,
//     stateParam,
//     pageParam,
//** success message **** */
//     message
// };

const formAction = ({ method, apiName, args }) => ({
    method,
    url: APIS?.[args?.module]?.[apiName],
    ...args
});

const formActionGetAll = (args) => formAction({ method: 'GET', apiName: 'getAll', args });
const formActionPost = (args) => formAction({ method: 'POST', apiName: 'post', args });
const formActionGet = (args) => formAction({ method: 'GET', apiName: 'get', args });
const formActionPut = (args) => formAction({ method: 'PUT', apiName: 'put', args });
const formActionDelete = (args) => formAction({ method: 'DELETE', apiName: 'delete', args });

export { LOCAL_STORAGE_LOGGED_USER };
export { COMP_CustomCard };
export { CONST_EMPLOYEES };
export { formActionGetAll, formActionPost, formActionGet, formActionPut, formActionDelete };
