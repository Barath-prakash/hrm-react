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
    delId
}) => {
    const apiActions = {
        getAll: formActionGetAll({
            module,
            page,
            size
        }),
        get: formActionGet({ module, orgId, idName, [idName]: getId }),
        post: formActionPost({ module, payload, orgId }),
        put: formActionPut({
            module,
            payload,
            orgId,
            idName,
            [idName]: payload?.[idName]
        }),
        delete: formActionDelete({ module, orgId, idName, [idName]: delId })
    };

    return crudMethods.crudService({
        setState,
        ...apiActions?.[action]
    });
};

export default apiAction;
