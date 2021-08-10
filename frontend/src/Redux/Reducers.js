import { combineReducers } from "redux";
import userReducers from "./userReducer";

const reducers = combineReducers({
  user: userReducers,
});

export default reducers;
