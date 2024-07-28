import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../config";
const initialState = {
  data: [],
  loading: false,
  error: null,

  hero: [],
  heroLoading: false,
  heroError: null,
};

export const getCharacters = createAsyncThunk(
  "character/getCharacters",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/posts");
      return response.data;
    } catch (err) {
      const status = err.response?.status || err?.message;
      return rejectWithValue(status);
    }
  }
);

export const getHero = createAsyncThunk(
  "character/getHero",
  async (payload, { rejectWithValue }) => {
    const { id } = payload;
    try {
      const response = await axiosInstance.post(`/characters/${id}`);
      return response.data;
    } catch (err) {
      const status = err.response?.status || err?.message;
      return rejectWithValue(status);
    }
  }
);

const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getHero.pending, (state) => {
        state.heroLoading = true;
        state.heroError = null;
      })
      .addCase(getHero.fulfilled, (state, action) => {
        state.hero = action.payload;
        state.heroLoading = false;
        state.heroError = null;
      })
      .addCase(getHero.rejected, (state, action) => {
        state.heroLoading = false;
        state.heroError = action.payload;
      });
  },
});

export default characterSlice.reducer;
