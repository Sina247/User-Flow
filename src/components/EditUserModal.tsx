"use client";

import axios from "axios";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { fetchUsers } from "@/redux/usersSlice";

// Define props type with user info and onClose callback
interface Props {
	user: {
		id: number;
		first_name: string;
	};
	onClose: () => void;
}

export default function EditUserModal({ user, onClose }: Props) {
	// Local state for name and job input fields, initialized with current user name
	const [name, setName] = useState(user.first_name);
	const [job, setJob] = useState("");
	// State to indicate loading status while submitting data
	const [loading, setLoading] = useState(false);

	// Access Redux dispatch function for state updates
	const dispatch = useAppDispatch();

	// Handle form submission for editing user
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate inputs: ensure both fields are filled
		if (!name || !job) return alert("Please fill out all fields");

		setLoading(true); // Show loading state during API call
		try {
			// Send PUT request to update user info on the server
			await axios.put(`https://reqres.in/api/users/${user.id}`, { name, job });

			// Inform user that changes are saved (note: reqres.in is a demo API and does not persist changes)
			alert("User edited (changes are not actually saved)");

			// Refresh user list after successful edit
			dispatch(fetchUsers());

			// Close the modal
			onClose();
		} catch {
			// Handle errors during update
			alert("Error editing user");
		} finally {
			// Remove loading state after completion
			setLoading(false);
		}
	};

	return (
		// Modal overlay with centered content
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Edit User</h2>

				{/* Form for editing user info */}
				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					{/* Name input */}
					<input type="text" placeholder="Name" className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={name} onChange={(e) => setName(e.target.value)} />

					{/* Job input */}
					<input type="text" placeholder="Job" className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={job} onChange={(e) => setJob(e.target.value)} />

					{/* Submit button */}
					<button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow cursor-pointer transition-all duration-400">
						{loading ? "Submitting" : "Save"}
					</button>
				</form>

				{/* Cancel button to close modal */}
				<button onClick={onClose} className="mt-6 text-center w-full text-red-600 font-semibold cursor-pointer">
					Cancel
				</button>
			</div>
		</div>
	);
}
