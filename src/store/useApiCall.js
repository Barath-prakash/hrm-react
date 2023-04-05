import { useCallback } from 'react';
import { setContextState } from './providers/handlers/utils';
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
            contextState
        } = configData;
        const { userToken: localUserToken } = getLocalStorage(CONST_LOCAL_STORAGE_LOGGED_USER);
        const { authState: { loggedUser: { userToken = '' } = {} } = {}, setAppError } =
            contextState;

        const token = userToken || localUserToken;
        headers['Accept'] = 'application/json';
        if (['POST', 'PUT'].includes(method)) headers['Content-Type'] = 'application/json';
        if (token) headers['Authorization'] = `Bearer ${token}`;

        loadingParam && setContextState({ setState, paramName: loadingParam, paramValue: true });
        setAppError?.(null);
        try {
            const response = await fetch(`${BASE_URL}${url}`, {
                method,
                headers,
                ...(['POST', 'PUT'].includes(method) &&
                    payload && { body: JSON.stringify(payload) })
            });
            const data = await response?.json();
            const resData = sourceFormat
                ? formatResponse({ data, sourceFormat, returnType, options: { readContent } })
                : data;
            stateParam && setContextState({ setState, paramName: stateParam, paramValue: resData });
            setContextState({ setState, paramName: loadingParam, paramValue: false });
            return resData;
        } catch (error) {
            console.error(`${url} - error: `, error);
            if (error?.status === 401) {
                console.log('Not-authorized');
                return;
            }
            loadingParam &&
                setContextState({ setState, paramName: loadingParam, paramValue: false });
            setAppError?.(error);
        }
    }, []);

    return callApi;
};

export default useApiCall;
