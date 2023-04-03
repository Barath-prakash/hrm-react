const authState = {
    isAuthenticated: false,
    user: { userName: '', password: '' },
    isLoginLoading: false,
    loggedUser: {
        userName: '',
        userEmail: '',
        userId: '',
        userToken: '',
        userRole: '',
        orgId: ''
    }
};

export default authState;
