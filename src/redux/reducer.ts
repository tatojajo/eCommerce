import { combineReducers } from "redux";

import homeReducer from "../pages/Home/redux/reducer";

const reducer = combineReducers({ homeReducer });

export default reducer;
