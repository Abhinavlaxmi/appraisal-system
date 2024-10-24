import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  theme: string;
  loading: boolean;
  error: string | null;
}

const initialState: ThemeState = {
  theme: 'jaina',
  loading: false,
  error: null,
};

export const themeHandler = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('themeHandler', async (type, thunkAPI) => {
  try {
    return type;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message || 'Theme change failed');
  }
});

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Optionally, define synchronous actions here
  },
  extraReducers: (builder) => {
    builder
      .addCase(themeHandler.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(themeHandler.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.theme = action.payload;
      })
      .addCase(themeHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Theme change failed';
      });
  },
});

export default themeSlice.reducer;
