const API_EMPLOYEES = {
    getAll: { api: '/admin/get-school-employees-by-page', ids: ['orgId'] },
    post: { api: '/admin/create-employee' },
    get: { api: '/employee/get-employee', ids: ['getId'] }, // employeeId
    put: { api: '/employee/update-employee', ids: ['employeeId'] },
    delete: ''
};

export { API_EMPLOYEES };
