import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './reducers/recipeSlice';
import userReducer from './reducers/userSlice'
const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['your/ignored/action'],
        ignoredPaths: ['payload.headers'], // Ignore specific paths if necessary
      },
    }),
});

export default store;
