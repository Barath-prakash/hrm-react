const departmentsState = {
    // Data
    departmentsData: {}, // getAll
    departmentsForm: {}, // post/put
    departmentsOne: {}, // get
    page: 1,
    size: 10,
    // Loading
    getAllFetching: false,
    getFetching: false,
    posting: false,
    putting: false,
    deleting: false,
    // Form
    departmentsModalOpen: false,
    formState: {}
};

export default departmentsState;
