const API_EMPLOYEES = {
    getAll: { api: '/admin/get-school-employees-by-page', ids: ['orgId'] },
    post: { api: '/admin/create-employee' },
    get: { api: '/employee/get-employee', ids: ['employeeId'] },
    put: { api: '/employee/update-employee', ids: ['employeeId'] },
    delete: { api: '/admin/delete-employee', ids: ['employeeId'] }
};

const API_DEPARTMENTS = {
    getAll: { api: '/all-department', ids: ['orgId'] },
    get: { api: '/department', ids: ['departmentId'] },
    post: { api: '/department', ids: ['orgId'] },
    put: { api: '/department', ids: ['orgId', 'departmentId'] },
    delete: { api: '/department', ids: ['departmentId'] }
};
export { API_EMPLOYEES, API_DEPARTMENTS };
