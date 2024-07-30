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
  details: null,
  detailsLoading: false,
  detailsError: null,
};

interface LetterPayload {
  letter: string;
}

interface NamePayload {
  name: string;
}

interface IdPayload {
  id: string;
}

export const getMealsbyLetter = createAsyncThunk<
  Meal[],
  LetterPayload,
  { rejectValue: string }
>("meal/getMealsbyLetter", async ({ letter }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/search.php?f=${letter}`);
    return response.data.meals;
  } catch (err: any) {
    const status = err.response?.status || err.message;
    console.log(status);
    return rejectWithValue(status);
  }
});

export const getMealByName = createAsyncThunk<
  Meal[],
  NamePayload,
  { rejectValue: string }
>("meal/getMealByName", async ({ name }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/search.php?s=${name}`);
    return response.data.meals;
  } catch (err: any) {
    const status = err.response?.status || err.message;
    return rejectWithValue(status);
  }
});

export const getMealDetails = createAsyncThunk<
  Meal[],
  IdPayload,
  { rejectValue: string }
>("meal/getMealDetails", async ({ id }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/lookup.php?i=${id}`);
    return response.data.meals;
  } catch (err: any) {
    const status = err.response?.status || err.message;
    return rejectWithValue(status);
  }
});

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
      .addCase(
        getMealsbyLetter.fulfilled,
        (state, action: PayloadAction<Meal[]>) => {
          state.data = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(
        getMealsbyLetter.rejected,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addCase(getMealByName.pending, (state) => {
        state.mealLoading = true;
        state.mealError = null;
      })
      .addCase(
        getMealByName.fulfilled,
        (state, action: PayloadAction<Meal[]>) => {
          state.meal = action.payload;
          state.mealLoading = false;
          state.mealError = null;
        }
      )
      .addCase(
        getMealByName.rejected,
        (state, action: PayloadAction<string>) => {
          state.mealLoading = false;
          state.mealError = action.payload;
        }
      )
      .addCase(getMealDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(
        getMealDetails.fulfilled,
        (state, action: PayloadAction<Meal[]>) => {
          state.details = action.payload[0];
          state.detailsLoading = false;
          state.detailsError = null;
        }
      )
      .addCase(
        getMealDetails.rejected,
        (state, action: PayloadAction<string>) => {
          state.detailsLoading = false;
          state.detailsError = action.payload;
        }
      );
  },
});

export default mealSlice.reducer;
