import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import authReducer from './auth/reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    auth: authReducer,
    customization: customizationReducer
});

export default reducer;
