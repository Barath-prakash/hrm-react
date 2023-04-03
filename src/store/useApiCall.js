import { useCallback } from 'react';
import useAppContext from './useAppContext';

const BASE_URL = 'https://api.scholae.in/api';
// const fetchOrPost = async (configData) => {
//     const {authMethods} = useApp
//   const { url = '', method = 'GET', payload = {}, headers } = configData;
//   headers['Accept'] = 'application/json';
//   if (method === 'POST') {
//     headers['Content-Type'] = 'application/json';
//   }
//   const response = await fetch(`${BASE_URL}${url}`, {
//       method,
//       headers,
//       ...(method === 'POST' && payload && { body: JSON.stringify(payload) })
//   });

//   if (response?.status === 401) {
//     await signIn('okta', { callbackUrl: '/' });
//     return;
//   }

//   return await response.json();
// };

// export default fetchOrPost;

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
            setAppState
            // test
        } = configData;

        headers['Accept'] = 'application/json';
        if (method === 'POST') headers['Content-Type'] = 'application/json';

        loadingParam && setAppState?.(loadingParam, true);
        setAppError?.(null);
        try {
            const response = await fetch(`${BASE_URL}${url}`, {
                method,
                headers,
                ...(method === 'POST' && payload && { body: JSON.stringify(payload) })
            });
            const data = await response?.json();
            stateParam && setAppState?.(stateParam, data);
            setAppState?.(loadingParam, false);
            return data;
        } catch (error) {
            if (response?.status === 401) {
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
