import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { Navigate } from 'react-router-dom';
import NotFoundPage from 'views/pages/notfound';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));
const Employees = Loadable(lazy(() => import('views/pages/employees/Employees')));
const Departments = Loadable(lazy(() => import('views/pages/departments/Departments')));
const Designations = Loadable(lazy(() => import('views/pages/designations/Designations')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = (isAuthenticated) => ({
    path: '/',
    element: isAuthenticated ? <MainLayout /> : <Navigate to="/auth/login" />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: '',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'employees',
            children: [
                {
                    path: '',
                    element: <Employees />
                }
            ]
        },
        {
            path: 'departments',
            children: [
                {
                    path: '',
                    element: <Departments />
                }
            ]
        },
        {
            path: 'designations',
            children: [
                {
                    path: '',
                    element: <Designations />
                }
            ]
        },
        {
            path: 'utils',
            children: [
                {
                    path: 'util-typography',
                    element: <UtilsTypography />
                },
                {
                    path: 'util-color',
                    element: <UtilsColor />
                },
                {
                    path: 'util-shadow',
                    element: <UtilsShadow />
                }
            ]
        },
        {
            path: 'icons',
            children: [
                {
                    path: 'tabler-icons',
                    element: <UtilsTablerIcons />
                },
                {
                    path: 'material-icons',
                    element: <UtilsMaterialIcons />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: '*',
            element: <NotFoundPage />
        }
    ]
});

export default MainRoutes;
