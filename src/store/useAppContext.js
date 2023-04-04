import { useContext } from 'react';
import { AppContext } from './providers/AppProvider';

const useAppContext = () => {
    const appContext = useContext(AppContext);
    // authState,
    // authMethods

    return { ...appContext };
};

export default useAppContext;
