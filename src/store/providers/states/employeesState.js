const employeesState = {
    // Data
    employeesData: {}, // getAll
    employeesForm: {}, // post/put
    employeesOne: {}, // get
    page: 1,
    size: 10,
    // Loading
    getAllFetching: false,
    getFetching: false,
    posting: false,
    putting: false,
    deleting: false
};

export default employeesState;
