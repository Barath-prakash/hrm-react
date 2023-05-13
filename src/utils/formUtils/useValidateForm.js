import { setContextState } from 'utils/contextStoreUtils/setContextUtils';
import { CONST_FIELD_REQUIRED } from './commonUtils';
import useStoreAccessByModule from 'utils/contextStoreUtils/useStoreAccessByModule';

const useValidateForm = () => {
    const { getMethodByModule, getStateParamDataByModule } = useStoreAccessByModule();

    const validateForm = (module) => {
        const formState = getStateParamDataByModule({ module, passStateParamName: 'formState' });
        let isErrorExist = false;
        const stateObjList = Object.values(formState).map((el) => {
            if (!isErrorExist) {
                isErrorExist = !!(!el?.options?.isNotField && el.options?.isReq && !el.fieldValue);
            }
            return {
                ...el,
                options: {
                    ...el.options,
                    validationError: el.options?.isReq && !el.fieldValue ? CONST_FIELD_REQUIRED : ''
                }
            };
        });

        const stateObj = {};
        for (const item of stateObjList) {
            stateObj[item.fieldName] = item;
        }

        setContextState({
            setState: getMethodByModule({ module }),
            paramName: 'formState',
            paramValue: stateObj
        });
        return { isErrorExist, formState };
    };

    return { validateForm };
};

export default useValidateForm;
