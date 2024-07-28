import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import {thunk} from 'redux-thunk';

import characterReducer from "./character/charactereSlice";

const rootReducer = combineReducers({
  character: characterReducer,
  // additional reducers could be added here
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
