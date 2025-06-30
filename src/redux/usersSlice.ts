import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Set default API key header for all axios requests
axios.defaults.headers.common["x-api-key"] = "reqres-free-v1";

const BASE_URL = "https://reqres.in/api/users";

// Async thunk to fetch the list of users with pagination support
export const fetchUsers = createAsyncThunk<any, number | undefined>("users/fetchUsers", async (page = 1) => {
	const response = await axios.get(`${BASE_URL}?page=${page}`, {
		headers: { "x-api-key": "reqres-free-v1" },
	});
	// Return the API response data
	return response.data;
});

// Async thunk to fetch a single user by ID
export const fetchUserById = createAsyncThunk("users/fetchUserById", async (id: string) => {
	const res = await axios.get(`${BASE_URL}/${id}`);
	// Return the user data
	return res.data.data;
});

// Create a slice for user state management with reducers and extraReducers
const usersSlice = createSlice({
	name: "users",
	initialState: {
		list: [] as any[], // Array of users
		totalPages: 1, // Total number of pages available
		page: 1, // Current page
		loading: false, // Loading state flag
		error: null as string | null, // Error message if any
		selectedUser: null as any, // Currently selected user details
	},
	reducers: {
		// No regular reducers needed here
	},
	extraReducers: (builder) => {
		builder
			// When fetchUsers is pending (API call started)
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			// When fetchUsers is fulfilled (API call succeeded)
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false;
				state.list = action.payload.data;
				state.totalPages = action.payload.total_pages;
				state.page = action.payload.page;
			})
			// When fetchUsers is rejected (API call failed)
			.addCase(fetchUsers.rejected, (state) => {
				state.loading = false;
				state.error = "Error fetching users";
			})
			// When fetchUserById is pending
			.addCase(fetchUserById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			// When fetchUserById is fulfilled
			.addCase(fetchUserById.fulfilled, (state, action) => {
				state.loading = false;
				state.selectedUser = action.payload;
			})
			// When fetchUserById is rejected
			.addCase(fetchUserById.rejected, (state) => {
				state.loading = false;
				state.error = "Error fetching user data";
			});
	},
});

// Export the reducer to use in the Redux store
export default usersSlice.reducer;
