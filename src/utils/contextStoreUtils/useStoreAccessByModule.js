import useAppContext from 'store/useAppContext';
import { makeFirstCaps } from 'utils/commonFunc';

export default function useStoreAccessByModule() {
    const appContext = useAppContext();

    // Default 'passMethodName' is set'Module'State
    // E.g: If module is 'EMPLOYEES' ---> setEmployeesState method will be return
    const getMethodByModule = ({ module, passMethodName }) => {
        return appContext?.[`${module?.toLowerCase()}Methods`]?.[
            passMethodName || `set${makeFirstCaps(module)}State`
        ];
    };

    const getStateParamDataByModule = ({ module, passStateParamName }) => {
        return appContext?.[`${module?.toLowerCase()}State`]?.[passStateParamName];
    };

    return { getMethodByModule, getStateParamDataByModule };
}
