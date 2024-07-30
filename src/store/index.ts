import { configureStore } from "@reduxjs/toolkit";
import mealReducer from "./meal/mealSlice";
import categoriesReducer from "./categories/categoriesSlice";
import ingredientReducer from "./ingredient/ingredientSlice";

const rootReducer = {
  meal: mealReducer,
  categories: categoriesReducer,
  ingredients: ingredientReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
