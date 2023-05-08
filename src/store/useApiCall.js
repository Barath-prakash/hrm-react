import { useCallback } from 'react';
import { setContextState } from '../utils/contextStoreUtils/setContextUtils';
import { getLocalStorage } from 'utils/commonFunc';
import { CONST_LOCAL_STORAGE_LOGGED_USER } from 'utils/constants';

// const BASE_URL = 'http://localhost:5000/api';
const BASE_URL = 'https://api.scholae.innobs.in/api';

const formatResponse = (formatData) => {
    const { data, sourceFormat, returnType, options = {} } = formatData;
    if (Array.isArray(sourceFormat) && returnType === 'object') {
        let returnObj = {};
        sourceFormat?.map((el) => {
            returnObj = {
                ...returnObj,
                [el.change]: data?.[el?.actual]
            };
        });
        return returnObj;
    } else if (
        options?.readContent &&
        Array.isArray(data?.content) &&
        Array.isArray(sourceFormat) &&
        returnType === 'array'
    ) {
        const returnList = data?.map((mainItem) => {
            let returnObj = {};
            sourceFormat?.map((el) => {
                returnObj = {
                    ...returnObj,
                    [el?.change]: data?.[el?.actual]
                };
            });
        });

        return { ...data, content: returnList };
    }
};

const useApiCall = () => {
    const callApi = useCallback(async (configData) => {
        const {
            url = '',
            method = 'GET',
            payload = {},
            headers = {},
            loadingParam = '',
            stateParam = '',
            setState,
            sourceFormat,
            returnType,
            readContent = false,
            // contextState from handler
            contextState,
            module,
            // additional
            toggleModal,
            toggleMenu,
            refetchAll,
            ...rest
        } = configData;
        //** Token section */
        const { userToken: localUserToken = '', userId = 0 } =
            getLocalStorage(CONST_LOCAL_STORAGE_LOGGED_USER) || {};
        const { authState: { loggedUser: { userToken = '' } = {} } = {}, setAppError } =
            contextState || {};
        const token = userToken || localUserToken;

        //** Headers section */
        headers['Accept'] = 'application/json';
        if (userId) headers['currentUserId'] = `${userId}`;
        if (['POST', 'PUT'].includes(method)) headers['Content-Type'] = 'application/json';
        if (token) headers['Authorization'] = `Bearer ${token}`;

        //** Loading begin */
        loadingParam && setContextState({ setState, paramName: loadingParam, paramValue: true });
        setAppError?.(null);
        try {
            //** API section */
            console.log('API_INITIATED', { url, method });
            const response = await fetch(`${BASE_URL}${url}`, {
                method,
                headers,
                ...(['POST', 'PUT'].includes(method) &&
                    payload && { body: JSON.stringify(payload) })
            });
            console.log('API_ENDED', { url, method });
            setContextState({ setState, paramName: loadingParam, paramValue: false });
            //** Modal close */ Close modal (If the action is performing on modal)
            if (toggleModal && typeof toggleModal === 'function') {
                toggleModal?.();
            }
            //** Menu toggle */
            // if (toggleMenu && typeof toggleMenu === 'function') {
            //     toggleMenu?.();
            // }
            //** Refetch section */
            if (refetchAll && typeof refetchAll === 'function') {
                refetchAll?.();
            }
            //** Store begin */
            const data = response?.ok ? await response?.json() : '';
            const resData =
                sourceFormat && data
                    ? formatResponse({ data, sourceFormat, returnType, options: { readContent } })
                    : data;
            if (stateParam && resData) {
                setContextState({ setState, paramName: stateParam, paramValue: resData });
            }
            return resData;
        } catch (error) {
            console.error(`Error: ${method}: ${url}: `, error);
            if (error?.status === 401) {
                console.log('Not-authorized');
                return;
            }
            if (loadingParam) {
                setContextState({ setState, paramName: loadingParam, paramValue: false });
            }
            setAppError?.(error);
        }
    }, []);

    return callApi;
};

export default useApiCall;
