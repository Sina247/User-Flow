// Import the users reducer created with createSlice from the usersSlice file
import usersReducer from "./usersSlice";

// Import configureStore to setup the Redux store with slices/reducers
import { configureStore } from "@reduxjs/toolkit";

// Configure the Redux store by combining all reducers (currently only usersReducer)
export const store = configureStore({
	reducer: {
		users: usersReducer, // Users state slice managed by usersReducer
	},
});

// Define the type for the Redux dispatch function to enable type safety in dispatching actions
export type AppDispatch = typeof store.dispatch;

// Define the RootState type representing the entire Redux state shape for use in selectors and hooks
export type RootState = ReturnType<typeof store.getState>;
