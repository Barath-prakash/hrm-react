import { legacy_createStore as createStore } from 'redux';
import reducer from './reducer';

// ==============================|| REDUX - MAIN STORE ||============================== //
// @TODO: Remove in future
const store = createStore(reducer);
const persister = 'Free';

export { store, persister };
