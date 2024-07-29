import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config";
const initialState = {
  data: [],
  loading: false,
  error: null,

  meal: [],
  mealLoading: false,
  mealError: null,
};

export const getMealCategories = createAsyncThunk(
  "meal/getMealCategories",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/categories.php");
      return response.data;
    } catch (err) {
      const status = err.response?.status || err?.message;
      console.log(status);
      return rejectWithValue(status);
    }
  }
);

export const getMealByName = createAsyncThunk(
  "meal/getMealByName",
  async (payload, { rejectWithValue }) => {
    const { name } = payload;
    try {
      const response = await axiosInstance.post(`/search.php?s=${name}`);
      return response.data;
    } catch (err) {
      const status = err.response?.status || err?.message;
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
      .addCase(getMealCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMealCategories.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getMealCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMealByName.pending, (state) => {
        state.mealLoading = true;
        state.mealError = null;
      })
      .addCase(getMealByName.fulfilled, (state, action) => {
        state.meal = action.payload;
        state.mealLoading = false;
        state.mealError = null;
      })
      .addCase(getMealByName.rejected, (state, action) => {
        state.mealLoading = false;
        state.mealError = action.payload;
      });
  },
});

export default mealSlice.reducer;
