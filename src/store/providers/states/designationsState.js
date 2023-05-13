const designationsState = {
    // Data
    designationsData: [], //getAll
    designationsForm: {}, //Post/put
    departmentsOne: {}, //get
    page: 1,
    size: 10,
    //Loading
    getAllFetching: false,
    getFetching: false,
    posting: false,
    putting: false,
    deleting: false,
    //Form
    designationsModalOpen: false,
    formState: {},
    // Additional
    parentDepartmentId: 0
};
export default designationsState;
