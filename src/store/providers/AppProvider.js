import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import authState from './states/authState';
import employeesState from './states/employeesState';
import useAuthMethodHandler from './handlers/useAuthMethodHandler';
import { CONST_LOCAL_STORAGE_LOGGED_USER } from 'utils/constants';
import { getLocalStorage } from 'utils/commonFunc';
import { setContextState } from '../../utils/contextStoreUtils/setContextUtils';
import useCrudMethodHandler from './handlers/useCrudMethodHandler';
import appState from './states/appState';
import departmentsState from './states/departmentsState';
import designationsState from './states/designationsState';

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
    // Employee
    const [employeesLocalState, setEmployeesState] = useState(employeesState);
    // Department
    const [departmentsLocalState, setDepartmentsState] = useState(departmentsState);
    const [designationsLocalState, setDesignationsState] = useState(designationsState);
    const [appLocalState, setAppState] = useState(appState);
    const contextState = {
        authState: authLocalState
    };

    useEffect(() => {
        if (!authLocalState?.loggedUser?.userToken) {
            const user = getLocalStorage(CONST_LOCAL_STORAGE_LOGGED_USER);
            if (user?.userId) {
                setContextState({
                    setState: setAuthState,
                    paramName: 'loggedUser',
                    paramValue: user
                });
                setContextState({
                    setState: setAuthState,
                    paramName: 'isAuthenticated',
                    paramValue: true
                });
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
        appState: appLocalState,
        appMethods: { setAppState },
        //** Auth */
        authState: authLocalState,
        authMethods,
        //** Crud */
        crudMethods,
        //** Employees */
        employeesState: employeesLocalState,
        employeesMethods: { setEmployeesState },
        // Departments
        departmentsState: departmentsLocalState,
        departmentsMethods: { setDepartmentsState },
        //Designations
        designationsState: designationsLocalState,
        designationsMethods: { setDesignationsState }
    };
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
    children: PropTypes.node?.isRequired
};

export default AppProvider;
