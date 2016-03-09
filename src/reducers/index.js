import { combineReducers } from 'redux';
import fuelSavingsAppState from './fuelSavings';
import i18nState from './i8n';
import user from './user';

const rootReducer = combineReducers({
    fuelSavingsAppState,
    user,
    i18nState
});

export default rootReducer;
