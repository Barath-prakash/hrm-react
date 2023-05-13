import { formActionGet, formActionGetAll } from './crudUtils';
import { formActionPost } from './crudUtils';
import { formActionPut } from './crudUtils';
import { formActionDelete } from './crudUtils';

const apiAction = ({
    crudMethods,
    setState,
    // pagination
    page,
    size,
    // passActionInfo
    action,
    module,
    orgId,
    idName,
    getId,
    payload,
    delId,
    ...rest
}) => {
    // CRUD HANDLER
    const apiActions = {
        getAll: formActionGetAll({
            module,
            page,
            size,
            ...rest
        }),
        get: formActionGet({ module, orgId, idName, [idName]: getId, ...rest }),
        post: formActionPost({ module, payload, orgId, ...rest }),
        put: formActionPut({
            module,
            payload,
            orgId,
            idName,
            [idName]: payload?.[idName],
            ...rest
        }),
        delete: formActionDelete({ module, orgId, idName, [idName]: delId, ...rest })
    };

    return crudMethods.crudService({
        setState,
        ...apiActions?.[action],
        ...rest
    });
};

export default apiAction;
