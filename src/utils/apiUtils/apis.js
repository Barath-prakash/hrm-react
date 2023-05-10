const API_EMPLOYEES = {
    getAll: { api: '/admin/get-school-employees-by-page', ids: ['orgId'] },
    post: { api: '/admin/create-employee' },
    get: { api: '/employee/get-employee', ids: ['employerId'] },
    put: { api: '/employee/update-employee', ids: ['employerId'] },
    delete: { api: '/admin/delete-employee', ids: ['employeId'] }
};

const API_DEPARTMENTS = {
    getAll: { api: '/all-department', ids: ['orgId'] },
    get: { api: '/department', ids: ['departmentId'] },
    post: { api: '/department', ids: ['orgId'] },
    put: { api: '/department', ids: ['orgId', 'departmentId'] },
    delete: { api: '/department', ids: ['departmentId'] }
};
const API_DESIGNATIONS = {
    getAll: { api: '/all-designation', ids: ['orgId', 'departmentId'] },
    get: { api: '/designation', ids: ['designationId'] },
    post: { api: '/designation', ids: ['orgId', 'departmentId'] },
    delete: { api: '/designation', ids: ['designationId'] },
    put: { api: '/designation', ids: ['orgId', 'designationId'] }
};
export { API_EMPLOYEES, API_DEPARTMENTS, API_DESIGNATIONS };
