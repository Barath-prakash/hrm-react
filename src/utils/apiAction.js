import { formActionGet, formActionGetAll } from './crudUtils';
import { formActionPost } from './crudUtils';
import { formActionPut } from './crudUtils';
import { formActionDelete } from './crudUtils';

const apiAction = ({
    crudMethods,
    setState,
    action,
    module,
    orgId,
    getId,
    getIdName,
    page,
    size,
    payload
}) => {
    const apiActions = {
        getAll: formActionGetAll({
            module,
            page,
            size
        }),
        get: formActionGet({ module, orgId, getId, getIdName }),
        post: formActionPost({ module, payload, orgId }),
        put: formActionPut({ module, payload, orgId }),
        delete: formActionDelete({ module, orgId })
    };

    crudMethods.crudService({
        setState,
        ...apiActions?.[action]
    });
};

export default apiAction;
