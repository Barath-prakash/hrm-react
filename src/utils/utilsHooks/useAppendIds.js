import useAppContext from 'store/useAppContext';

const useAppendIds = (ids, args) => {
    const {
        authState: {
            loggedUser: { orgId }
        }
    } = useAppContext();
    return ids?.length ? `/${ids.map((id) => (id === 'orgId' ? orgId : args?.[id])).join('/')}` : '';
};

export default useAppendIds;
