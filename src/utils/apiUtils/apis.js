const API_EMPLOYEES = {
    getAll: { api: '/admin/get-school-employees-by-page', ids: ['orgId'] },
    post: { api: '/admin/create-employee' },
    get: { api: '/employee/get-employee', ids: ['employeeId'] },
    put: { api: '/employee/update-employee', ids: ['employeeId'] },
    delete: { api: '/admin/delete-employee', ids: ['employeeId'] }
};

export { API_EMPLOYEES };
