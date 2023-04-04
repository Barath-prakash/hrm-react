import { useCallback } from 'react';
import useApiCall from 'store/useApiCall';
import useAppContext from 'store/useAppContext';
import { setLocalStorage } from 'utils/commonFunc';
import { LOCAL_STORAGE_LOGGED_USER } from 'utils/constants';
// import { setContextState } from './utils';

const useAuthMethodHandler = ({ setState }) => {
    const { authStore: { user: { username = '', password = '' } = {} } = {} } = useAppContext();
    const api = useApiCall();

    const userLoginService = useCallback(async (loginData) => {
        console.log({ username, password, ...loginData });
        const res = await api({
            method: 'POST',
            payload: { username: loginData?.email, password: loginData?.password },
            url: '/auth/signin',
            loadingParam: 'isLoginLoading',
            stateParam: 'loggedUser',
            setState,
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
        setLocalStorage(LOCAL_STORAGE_LOGGED_USER, res);
    });

    return { userLoginService };
};

export default useAuthMethodHandler;
