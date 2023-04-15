import { useCallback } from 'react';
import useApiCall from 'store/useApiCall';

const useCrudMethodHandler = ({ contextState }) => {
    const api = useApiCall();

    const crudService = useCallback(
        async (postData) => {
            const {
                // method - payload from crudUtils
                method,
                url,
                loadingParam,
                stateParam,
                payload,
                setState, // setState from component. Eg: employees -> setEmployeesState
                ...rest
            } = postData;
            console.log('rest-incrud-', rest);
            await api({
                method,
                url,
                payload,
                loadingParam,
                stateParam,
                setState,
                // contextState from handler
                contextState,
                ...rest
            });
        },
        [api, contextState]
    );

    return { crudService };
};

export default useCrudMethodHandler;
