import { useCallback } from 'react';
import useApiCall from 'store/useApiCall';
// import useAppContext from 'store/useAppContext';
// import { setLocalStorage } from 'utils/commonFunc';
// import { LOCAL_STORAGE_LOGGED_USER } from 'utils/constants';
// import { setContextState } from './utils';

const useCrudMethodHandler = () => {
    const api = useApiCall();

    const postService = useCallback(async (postData) => {
        const { method, url, payload, loadingParam, stateParam, setState } = postData;
        await api({
            method,
            payload,
            url,
            loadingParam,
            stateParam,
            setState
        });
    });

    return { postService };
};

export default useCrudMethodHandler;
