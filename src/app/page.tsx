"use client";

import { useEffect, useState } from "react";
import UserCard from "@/components/UserCard";
import UserModal from "@/components/UserModal";
import { fetchUsers } from "@/redux/usersSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Page() {
	// Initialize Redux dispatch function
	const dispatch = useAppDispatch();

	// Get users data and status from Redux store
	const { list, totalPages, page, loading, error } = useAppSelector((state) => state.users);

	// Local state to manage modal visibility
	const [modalOpen, setModalOpen] = useState(false);

	// Fetch users list when component mounts
	useEffect(() => {
		dispatch(fetchUsers());
	}, [dispatch]);

	return (
		<div className="max-w-5xl mx-auto p-6 sm:p-10">
			{/* Header section with Reload and User Login buttons */}
			<header className="flex flex-col sm:flex-row justify-between items-center mb-8">
				{/* Page title */}
				<h1 className="text-3xl font-extrabold text-gray-900 mb-4 sm:mb-0">Users List</h1>

				<div className="flex gap-4">
					{/* Reload button to re-fetch users on current page */}
					<button className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-md cursor-pointer transition-all duration-400" onClick={() => dispatch(fetchUsers(page))}>
						Reload
					</button>

					{/* Open user login modal */}
					<button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md cursor-pointer transition-all duration-400" onClick={() => setModalOpen(true)}>
						User Login
					</button>
				</div>
			</header>

			{/* Display loading message while fetching */}
			{loading && <p className="text-center text-gray-500 py-10">Loading data...</p>}

			{/* Display error message if fetch fails */}
			{error && <p className="text-center text-red-600 py-10">{error}</p>}

			{/* Users grid */}
			<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{list.map((user) => (
					<UserCard key={user.id} user={user} />
				))}
			</section>

			{/* Pagination controls */}
			<nav className="flex justify-center mt-12 gap-3">
				{Array.from({ length: totalPages }).map((_, i) => (
					<button key={i} className={`px-4 py-2 border rounded-lg font-semibold transition-all duration-400 ${page === i + 1 ? "bg-yellow-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`} onClick={() => dispatch(fetchUsers(i + 1))} aria-label={`Page ${i + 1}`}>
						{i + 1}
					</button>
				))}
			</nav>

			{/* Conditionally render UserModal */}
			{modalOpen && <UserModal onClose={() => setModalOpen(false)} />}
		</div>
	);
}
