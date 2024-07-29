import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config";
import { MealsState, Meal } from "./types";

const initialState: MealsState = {
  data: [],
  loading: false,
  error: null,
  meal: [],
  mealLoading: false,
  mealError: null,
};

interface LetterPayload {
  letter: string;
}

interface NamePayload {
  name: string;
}

export const getMealsbyLetter = createAsyncThunk<Meal[], LetterPayload, { rejectValue: string }>(
  "meal/getMealsbyLetter",
  async ({ letter }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/search.php?f=${letter}`);
      return response.data.meals;
    } catch (err: any) {
      const status = err.response?.status || err.message;
      console.log(status);
      return rejectWithValue(status);
    }
  }
);

export const getMealByName = createAsyncThunk<Meal[], NamePayload, { rejectValue: string }>(
  "meal/getMealByName",
  async ({ name }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/search.php?s=${name}`);
      return response.data.meals;
    } catch (err: any) {
      const status = err.response?.status || err.message;
      return rejectWithValue(status);
    }
  }
);

const mealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMealsbyLetter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMealsbyLetter.fulfilled, (state, action: PayloadAction<Meal[]>) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getMealsbyLetter.rejected, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMealByName.pending, (state) => {
        state.mealLoading = true;
        state.mealError = null;
      })
      .addCase(getMealByName.fulfilled, (state, action: PayloadAction<Meal[]>) => {
        state.meal = action.payload;
        state.mealLoading = false;
        state.mealError = null;
      })
      .addCase(getMealByName.rejected, (state, action: PayloadAction<string>) => {
        state.mealLoading = false;
        state.mealError = action.payload;
      });
  },
});

export default mealSlice.reducer;
