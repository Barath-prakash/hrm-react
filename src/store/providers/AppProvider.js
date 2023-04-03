import React, { createContext, useState } from 'react';
import authState from './states/authState';
import useAuthMethodHandler from './handlers/useAuthMethodHandler';

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
    const [authProviderState, setAuthState] = useState(authState);
    const authMethods = useAuthMethodHandler({
        setState: setAuthState
    });

    const contextValue = {
        // App
        appError,
        setAppError,
        // Auth
        authState: authProviderState,
        authMethods
    };
    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export default AppProvider;
