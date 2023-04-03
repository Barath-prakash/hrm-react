import { useCallback } from 'react';
import useApiCall from 'store/useApiCall';
import useAppContext from 'store/useAppContext';
import { setLocalStorage } from 'utils/commonFunc';

const useAuthMethodHandler = ({ setState }) => {
    const { authStore: { user: { username = '', password = '' } = {} } = {} } = useAppContext();
    const api = useApiCall();

    const setAuthState = (paramName, value) => {
        setState((prevData) => ({
            ...prevData,
            ...(typeof value === 'object' && !Array.isArray(value)
                ? {
                      [paramName]: {
                          ...prevData?.[paramName],
                          ...value
                      }
                  }
                : {
                      [paramName]: value
                  })
        }));
    };

    const userLoginService = useCallback(async (loginData) => {
        console.log({ username, password, ...loginData });
        const res = await api({
            method: 'POST',
            payload: { username: loginData?.email, password: loginData?.password },
            url: '/auth/signin',
            loadingParam: 'isLoginLoading',
            stateParam: 'loggedUser',
            setAppState: setAuthState,
            sourceFormat: [
                { actual: 'accessToken', change: 'userToken' },
                { actual: 'fullName', change: 'userName' },
                { actual: 'email', change: 'userEmail' },
                { actual: 'userRole', change: 'userRole' },
                { actual: 'referenceId', change: 'userId' },
                { actual: 'schoolId', change: 'orgId' }
            ],
            returnType: 'object'
        });
        console.log('res', res);
        setLocalStorage('loggedUser', res);
    });

    return { userLoginService };
};

export default useAuthMethodHandler;
