"use client";

import axios from "axios"; // Import axios for HTTP requests
import { useParams } from "next/navigation"; // Hook to get dynamic route parameters
import { useEffect, useState } from "react"; // React hooks for state and lifecycle management

export default function UserDetailsPage() {
	// Get the user ID from the route parameters
	const { id } = useParams();

	// State to store the user data fetched from the API
	const [user, setUser] = useState<any>(null);

	// State to track loading status while fetching data
	const [loading, setLoading] = useState(true);

	// State to store any error message encountered during fetch
	const [error, setError] = useState<string | null>(null);

	// Effect to fetch user data whenever the ID changes
	useEffect(() => {
		async function fetchUser() {
			setLoading(true); // Start loading state
			setError(null); // Reset error state
			try {
				// Make GET request to fetch user details by ID
				const res = await axios.get(`https://reqres.in/api/users/${id}`);
				setUser(res.data.data); // Store user data on success
			} catch {
				setError("Failed to load user data"); // Set error message on failure
			} finally {
				setLoading(false); // End loading state
			}
		}
		fetchUser();
	}, [id]);

	// Show loading message while fetching
	if (loading) return <p className="text-center py-10 text-gray-500">Loading...</p>;

	// Show error message if fetch failed
	if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

	// Return nothing if no user data available
	if (!user) return null;

	// Render user details when data is available
	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
				{/* User avatar */}
				<img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-32 h-32 rounded-full mx-auto object-cover shadow" />

				{/* User full name */}
				<h1 className="text-3xl font-bold text-center mt-6">
					{user.first_name} {user.last_name}
				</h1>

				{/* User email */}
				<p className="text-center mt-2 text-gray-600">{user.email}</p>
			</div>
		</div>
	);
}
