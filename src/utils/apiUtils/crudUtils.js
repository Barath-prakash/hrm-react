// APIS SOURCE

import { API_DEPARTMENTS, API_EMPLOYEES, API_DESIGNATIONS } from './apis';
import { getLocalStorage } from '../commonFunc';
import { CONST_LOCAL_STORAGE_LOGGED_USER } from '../constants';

const APIS = {
    EMPLOYEES: API_EMPLOYEES,
    DEPARTMENTS: API_DEPARTMENTS,
    DESIGNATIONS: API_DESIGNATIONS
};

// operation
// args: {
//     module
//     url,
//** context params **** */
//     loadingParam,
//     stateParam,
//** data and messages **** */
//     orgId: 0,
//     payload,
//     id: 0,
//     page: 1,
//     size: 10,
//     message
// };

const appendPagination = (params, canAppend = false) => {
    if (params?.page) {
        return `${canAppend ? '&' : '?'}${Object.keys(params)
            .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
            .join('&')}`;
    }
    return '';
};

const appendIds = (ids, args) => {
    const { orgId } = getLocalStorage(CONST_LOCAL_STORAGE_LOGGED_USER) || {};
    const { idName, getIdName } = args;
    return ids?.length
        ? `/${ids
              .map((id) =>
                  id === 'orgId' && orgId
                      ? orgId
                      : args?.[id || getIdName || idName]
                      ? args?.[id || getIdName || idName]
                      : ''
              )
              .join('/')}`
        : '';
};

const formAction = ({ method, apiPropName, loadingParam, args }) => {
    const API_CONFIG = APIS?.[args?.module]?.[apiPropName];
    return {
        method,
        url: `${API_CONFIG?.api}${appendIds(API_CONFIG?.ids, args)}${appendPagination({
            page: args?.page,
            size: args?.size
        })}`,
        loadingParam,
        ...(apiPropName === 'getAll' && { stateParam: `${args?.module?.toLowerCase()}Data` }),
        ...(apiPropName === 'get' && { stateParam: `${args?.module?.toLowerCase()}One` }),
        ...args // module, orgId, idName, or someOtherIds, payload, page, size, message
    };
};

const formActionGetAll = (args) => {
    return formAction({
        method: 'GET',
        apiPropName: 'getAll',
        loadingParam: 'getAllFetching',
        args
    });
};

const formActionPost = (args) => {
    return formAction({ method: 'POST', apiPropName: 'post', loadingParam: 'posting', args });
};
const formActionGet = (args) => {
    return formAction({ method: 'GET', apiPropName: 'get', loadingParam: 'getFetching', args });
};
const formActionPut = (args) => {
    return formAction({ method: 'PUT', apiPropName: 'put', loadingParam: 'putting', args });
};
const formActionDelete = (args) => {
    return formAction({ method: 'DELETE', apiPropName: 'delete', loadingParam: 'deleting', args });
};

export { formActionGetAll, formActionPost, formActionGet, formActionPut, formActionDelete };
