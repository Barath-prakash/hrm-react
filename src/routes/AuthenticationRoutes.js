import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import NotFoundPage from 'views/pages/notfound';

// login option 3 routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication3/Login')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = (isAuthenticated) => ({
    path: '/auth',
    element: !isAuthenticated ? <MinimalLayout /> : <Navigate to="/dashboard" />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'register',
            element: <AuthRegister3 />
        },
        {
            path: '*',
            element: <NotFoundPage />,
            auth: false
        }
    ],
    auth: false
});

export default AuthenticationRoutes;
