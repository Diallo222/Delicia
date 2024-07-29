import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import {thunk} from 'redux-thunk';

import mealReducer from "./meal/mealSlice";

const rootReducer = combineReducers({
  meal: mealReducer,
  // additional reducers could be added here
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
