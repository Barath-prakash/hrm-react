import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import useAppContext from 'store/useAppContext';
import { getLocalStorage } from 'utils/commonFunc';
import { LOCAL_STORAGE_LOGGED_USER } from 'utils/constants';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const userId = getLocalStorage(LOCAL_STORAGE_LOGGED_USER)?.userId;
    const {
        authState: { isAuthenticated: isAuth }
    } = useAppContext();
    const isAuthenticated = !!(isAuth || userId);

    const routes = [MainRoutes(isAuthenticated), AuthenticationRoutes(isAuthenticated)];
    const AppRoutes = useRoutes(routes);

    return AppRoutes;
}
