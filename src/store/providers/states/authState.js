const authState = {
    isAuthenticated: false,
    user: { userName: '', password: '' },
    isLoginLoading: false,
    loggedUser: {
        userName: '',
        email: '',
        userId: '',
        userToken: ''
    }
};

export default authState;
