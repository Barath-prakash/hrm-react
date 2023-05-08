import { setContextState } from 'utils/contextStoreUtils/setContextUtils';
import useStoreAccessByModule from '../contextStoreUtils/useStoreAccessByModule';

const useModalUtils = () => {
    const { getMethodByModule, getStateParamDataByModule } = useStoreAccessByModule();

    const handleToggleModal = ({ module, otherModalParam }) => {
        // @TODO: otherModalParam refers to, any other modal param except than main modal param for that module
        const modalParamName = `${module.toLowerCase()}ModalOpen`;
        setContextState({
            setState: getMethodByModule({ module }),
            paramName: otherModalParam || modalParamName,
            paramValue: !getStateParamDataByModule({ module, passStateParamName: modalParamName })
        });
    };

    return { handleToggleModal };
};

export default useModalUtils;
