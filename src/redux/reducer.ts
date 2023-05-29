import { combineReducers } from 'redux';

import homeReducer from '../pages/Home/redux/reducer';
import adminReducer from '../Admin/Redux/reducer';

const reducer = combineReducers({ homeReducer, adminReducer });

export default reducer;
