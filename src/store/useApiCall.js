import { useCallback } from 'react';
import useAppContext from './useAppContext';

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

function useApiCall() {
    const { authStore: { loggedUser: { userToken = '' } = {} } = {}, setAppError } = useAppContext();
    console.log({ userToken });
    const callApi = useCallback(async (configData) => {
        const {
            url = '',
            method = 'GET',
            payload = {},
            headers = {},
            loadingParam = '',
            stateParam = '',
            setAppState,
            sourceFormat,
            returnType,
            readContent = false
            // test
        } = configData;

        headers['Accept'] = 'application/json';
        if (method === 'POST') headers['Content-Type'] = 'application/json';
        if (userToken) headers['Authorization'] = `Bearer ${userToken}`;

        loadingParam && setAppState?.(loadingParam, true);
        setAppError?.(null);
        try {
            const response = await fetch(`${BASE_URL}${url}`, {
                method,
                headers,
                ...(method === 'POST' && payload && { body: JSON.stringify(payload) })
            });
            const data = await response?.json();
            const resData = sourceFormat ? formatResponse({ data, sourceFormat, returnType, options: { readContent } }) : data;
            stateParam && setAppState?.(stateParam, resData);
            setAppState?.(loadingParam, false);
            return resData;
        } catch (error) {
            console.error(`${url} - error: `, error);
            if (error?.status === 401) {
                console.log('Not-authorized');
                return;
            }
            loadingParam && setAppState?.(loadingParam, false);
            setAppError?.(error);
        }
    }, []);

    return callApi;
}

export default useApiCall;
