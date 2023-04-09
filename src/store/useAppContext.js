import { useContext } from 'react';
import { AppContext } from './providers/AppProvider';

const useAppContext = () => {
    const appContext = useContext(AppContext);
    // authState,
    // authMethods: Check Handler
    // crudMethods: Check Handler
    // employeeState
    // employeesMethods: { setEmployeesState }

    return { ...appContext };
};

export default useAppContext;
