import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../api/apiService'; // Assuming you have an API service for fetching recipes
// Fetch recipes from the API
export const fetchUser = createAsyncThunk('recipes/users', async (data) => {
  const response = await login(data);
  return response;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    storeUser: (state, action) => {
      state.user = action.payload; // Add new recipe to the state
    },
    logout: (state) => {
      state.user = null; // Clear user data upon logout
      state.error = null; // Optionally clear errors or other data related to the user
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Failed to fetch recipes';
      });
  },
});

export const { storeUser,logout } = userSlice.actions;

export default userSlice.reducer;
