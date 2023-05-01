import { combineReducers } from "redux";

import homeReducer from "../pages/Home/redux/rducer";

const reducer = combineReducers({ homeReducer });

export default reducer;
