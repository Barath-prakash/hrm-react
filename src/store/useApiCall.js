import { useCallback } from 'react';
import { setContextState } from './providers/handlers/utils';

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
    } else if (options?.readContent && Array.isArray(data?.content) && Array.isArray(sourceFormat) && returnType === 'array') {
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
        const { authState: { loggedUser: { userToken = '' } = {} } = {}, setAppError } = contextState;
        console.log({ userToken });

        headers['Accept'] = 'application/json';
        if (['POST', 'PUT'].includes(method)) headers['Content-Type'] = 'application/json';
        if (userToken) headers['Authorization'] = `Bearer ${userToken}`;

        loadingParam && setContextState?.(setState, loadingParam, true);
        setAppError?.(null);
        try {
            const response = await fetch(`${BASE_URL}${url}`, {
                method,
                headers,
                ...(['POST', 'PUT'].includes(method) && payload && { body: JSON.stringify(payload) })
            });
            const data = await response?.json();
            const resData = sourceFormat ? formatResponse({ data, sourceFormat, returnType, options: { readContent } }) : data;
            stateParam && setContextState?.(setState, stateParam, resData);
            setContextState?.(setState, loadingParam, false);
            return resData;
        } catch (error) {
            console.error(`${url} - error: `, error);
            if (error?.status === 401) {
                console.log('Not-authorized');
                return;
            }
            loadingParam && setContextState?.(setState, loadingParam, false);
            setAppError?.(error);
        }
    }, []);

    return callApi;
};

export default useApiCall;
