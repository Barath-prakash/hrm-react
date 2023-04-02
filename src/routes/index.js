import { useRoutes, Navigate, Route } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import useAppStore from 'store/useAppStore';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    const { authStore } = useAppStore();
    const isAuthenticated = authStore?.isAuthenticated;

    console.log('authStore', authStore);

    const routes = [MainRoutes(isAuthenticated), AuthenticationRoutes(isAuthenticated)];
    const AppRoutes = useRoutes(routes);

    return AppRoutes;
}
