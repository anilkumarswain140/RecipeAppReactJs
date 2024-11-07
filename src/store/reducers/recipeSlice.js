import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRecipes, createRecipe } from '../../api/apiService'; // Import your API service functions

// Fetch recipes from the API
export const fetchRecipes = createAsyncThunk(
    'recipes/fetchRecipes',
    async (search, { rejectWithValue }) => {
        try {
            const response = await getRecipes(search);
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Add a new recipe to the API
export const addRecipe = createAsyncThunk('recipes/addRecipe', async (newRecipe, { rejectWithValue }) => {
    try {
        const response = await createRecipe(newRecipe); // Call the API function to add the recipe
        return response;
    } catch (error) {
        // Handle the error, extract message if possible
        const message = error.response?.data?.message || error.message || 'Failed to add recipe';
        console.error('Error in addRecipe:', message);
        return rejectWithValue(message); // Return the error message to be used in the Redux slice
    }
});

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        loading: false,
        error: null,
        currentPage: 0,
        totalPages: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRecipes.fulfilled, (state, action) => {
                state.loading = false;
                state.recipes = action.payload.recipes; // Update recipes state
                state.currentPage = action.payload.currentPage;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(fetchRecipes.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to fetch recipes';
            })
            .addCase(addRecipe.pending, (state) => {
                state.loading = true;
            })
            .addCase(addRecipe.fulfilled, (state) => {
                state.loading = false;
                // No need to push to state here; we will refresh recipes after adding
            })
            .addCase(addRecipe.rejected, (state) => {
                state.loading = false;
                state.error = 'Failed to add recipe';
            })

    },
});

export default recipeSlice.reducer;
