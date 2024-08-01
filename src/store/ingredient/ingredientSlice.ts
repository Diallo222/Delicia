import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config";
import { Meal } from "../meal/types";
import { IngredientsState, Ingredient } from "./types";

const initialState: IngredientsState = {
  ingredients: [],
  loading: false,
  error: null,

  filteredData: [],
  filterLoading: false,
  filterError: null,
};

// Async thunk to get all ingredients
export const getAllIngredients = createAsyncThunk<
  Ingredient[],
  void,
  { rejectValue: string }
>("ingredient/getAllIngredients", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get("/list.php?i=list");
    return response.data.meals;
  } catch (err: any) {
    const status = err.response?.status || err.message;
    return rejectWithValue(status);
  }
});

// Async thunk to filter meals by ingredient
export const filterByIngredient = createAsyncThunk<
  Meal[],
  { ingredient: string },
  { rejectValue: string }
>(
  "ingredient/filterByIngredient",
  async ({ ingredient }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/filter.php?i=${ingredient}`);
      return response.data.meals;
    } catch (err: any) {
      const status = err.response?.status || err.message;
      return rejectWithValue(status);
    }
  }
);

const ingredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllIngredients.fulfilled,
        (state, action: PayloadAction<Ingredient[]>) => {
          state.ingredients = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getAllIngredients.rejected,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload || "Unknown error";
        }
      )
      .addCase(filterByIngredient.pending, (state) => {
        state.filterLoading = true;
        state.filterError = null;
      })
      .addCase(
        filterByIngredient.fulfilled,
        (state, action: PayloadAction<Meal[]>) => {
          state.filteredData = action.payload;
          state.filterLoading = false;
          state.filterError = null;
        }
      )
      .addCase(
        filterByIngredient.rejected,
        (state, action: PayloadAction<string>) => {
          state.filterLoading = false;
          state.filterError = action.payload || "Unknown error";
        }
      );
  },
});

export default ingredientSlice.reducer;
