import { useCallback } from 'react';
import useApiCall from 'store/useApiCall';
import useAppContext from 'store/useAppContext';

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

    const userLoginService = useCallback(() => {
        console.log({ username, password });
        const res = api({
            method: 'POST',
            url: '',
            setAppState: setAuthState,
            loadingParam: 'isLoginLoading'
        });
    });

    return { userLoginService };
};

export default useAuthMethodHandler;
