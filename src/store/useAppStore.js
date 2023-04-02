const { useSelector } = require('react-redux');

const useAppStore = () => {
    const appStore = useSelector((state) => state);
    const authStore = useSelector((state) => state?.auth);

    return { appStore, authStore };
};

export default useAppStore;
