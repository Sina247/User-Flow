"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import EditUserModal from "./EditUserModal";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUsers } from "@/redux/usersSlice";

// Define the User interface to type the user prop
interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	avatar: string;
}

export default function UserCard({ user }: { user: User }) {
	const router = useRouter(); // Next.js router for navigation
	const dispatch = useAppDispatch(); // Redux dispatch hook
	const [editOpen, setEditOpen] = useState(false); // State to control edit modal visibility

	// Function to handle user deletion
	const handleDelete = async () => {
		// Confirm before deleting user
		if (!confirm("Are you sure you want to delete the user?")) return;

		try {
			// Send DELETE request to API
			await axios.delete(`https://reqres.in/api/users/${user.id}`);
			alert("User deleted");
			// Refresh user list after deletion
			dispatch(fetchUsers());
		} catch {
			// Show error message if deletion fails
			alert("Error deleting user");
		}
	};

	return (
		<div className="flex flex-col items-center gap-4 bg-white rounded-md cursor-pointer p-[30px]">
			{/* User avatar; clicking navigates to user details page */}
			<img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="w-28 h-28 rounded-full object-cover shadow-sm" onClick={() => router.push(`/users/${user.id}`)} />

			{/* User name and email */}
			<div className="text-center">
				<p className="text-lg font-bold ">
					{user.first_name} {user.last_name}
				</p>

				<p className="text-gray-500">{user.email}</p>
			</div>

			{/* Edit and Delete buttons */}
			<div className="flex gap-4">
				<button onClick={() => setEditOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-2 cursor-pointer transition-all duration-400">
					Edit
				</button>

				<button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 cursor-pointer transition-all duration-400">
					Delete
				</button>
			</div>

			{/* Conditionally render EditUserModal when editOpen is true */}
			{editOpen && <EditUserModal user={user} onClose={() => setEditOpen(false)} />}
		</div>
	);
}
