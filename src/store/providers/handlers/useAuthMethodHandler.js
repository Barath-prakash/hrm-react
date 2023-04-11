import { useCallback } from 'react';
import useApiCall from 'store/useApiCall';
import useAppContext from 'store/useAppContext';
import { setLocalStorage } from 'utils/commonFunc';
import { CONST_LOCAL_STORAGE_LOGGED_USER } from 'utils/constants';

const useAuthMethodHandler = ({ setState }) => {
    const { authStore: { user: { username = '', password = '' } = {} } = {} } = useAppContext();
    const api = useApiCall();

    const userLoginService = useCallback(async (loginData) => {
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
        setLocalStorage(CONST_LOCAL_STORAGE_LOGGED_USER, res);
    });

    return { userLoginService };
};

export default useAuthMethodHandler;
