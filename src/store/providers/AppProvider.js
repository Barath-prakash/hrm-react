import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import authState from './states/authState';
import employeesState from './states/employeesState';
import useAuthMethodHandler from './handlers/useAuthMethodHandler';
import { CONST_LOCAL_STORAGE_LOGGED_USER } from 'utils/constants';
import { getLocalStorage } from 'utils/commonFunc';
import { setContextState } from './handlers/utils';
import useCrudMethodHandler from './handlers/useCrudMethodHandler';

// Define a context
export const AppContext = createContext({
    // App
    appError: '',
    setAppError: undefined,
    // Auth
    authState,
    authMethods: undefined
});

// Define a component that provides data to the context
const AppProvider = ({ children }) => {
    const [appError, setAppError] = useState('');
    const [authLocalState, setAuthState] = useState(authState);
    const [employeesLocalState, setEmployeesState] = useState(employeesState);

    const contextState = {
        authState: authLocalState
    };

    useEffect(() => {
        if (!authLocalState?.loggedUser?.userToken) {
            const user = getLocalStorage(CONST_LOCAL_STORAGE_LOGGED_USER);
            if (user?.userId) {
                setContextState(setAuthState, 'loggedUser', user);
                setContextState(setAuthState, 'isAuthenticated', true);
            }
        }
    }, [authLocalState?.loggedUser?.userToken]);

    const authMethods = useAuthMethodHandler({
        setState: setAuthState
    }); // setAuthState, userLoginService

    const crudMethods = useCrudMethodHandler({ contextState });

    const contextValue = {
        //** App */
        appError,
        setAppError,
        //** Auth */
        authState: authLocalState,
        authMethods,
        //** Crud */
        crudMethods,
        //** Employees */
        employeesState: employeesLocalState,
        employeesMethods: { setEmployeesState }
    };
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
    children: PropTypes.node?.isRequired
};

export default AppProvider;
