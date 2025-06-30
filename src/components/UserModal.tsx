import axios from "axios"; // Import axios for HTTP requests
import { useState } from "react"; // Import useState hook to manage component state
import { useAppDispatch } from "@/redux/hooks"; // Custom hook to get the Redux dispatch function
import { fetchUsers } from "@/redux/usersSlice"; // Redux async action to fetch user list

export default function UserModal({ onClose }: { onClose: () => void }) {
	// State to store the entered user name
	const [name, setName] = useState("");
	// State to store the entered user job
	const [job, setJob] = useState("");
	// State to track loading status during API call
	const [loading, setLoading] = useState(false);
	// Get the Redux dispatch function
	const dispatch = useAppDispatch();

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevent default form submission reload

		// Validate inputs, show alert if any field is empty
		if (!name || !job) return alert("Please fill out all fields");

		setLoading(true); // Start loading state (disable submit button)

		try {
			// Send POST request to create a new user with name and job
			await axios.post("https://reqres.in/api/users", { name, job });

			alert("User created successfully"); // Notify user of success

			dispatch(fetchUsers()); // Refresh the user list by fetching updated data from API

			onClose(); // Close the modal
		} catch {
			alert("Error creating user"); // Show error alert on failure
		} finally {
			setLoading(false); // Stop loading state regardless of success/failure
		}
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
			{/* Semi-transparent backdrop to focus on modal */}

			<div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
				{/* Modal container with styling */}

				<h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Add New User</h2>
				{/* Modal title */}

				<form onSubmit={handleSubmit} className="flex flex-col gap-5">
					{/* Form with submit handler */}

					<input
						type="text"
						placeholder="Name"
						className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={name}
						onChange={(e) => setName(e.target.value)} // Update name state on input change
					/>

					<input
						type="text"
						placeholder="Job"
						className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={job}
						onChange={(e) => setJob(e.target.value)} // Update job state on input change
					/>

					<button
						type="submit"
						disabled={loading} // Disable button while loading
						className="bg-green-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-green-700 cursor-pointer transition-all duration-400"
					>
						{loading ? "Sending" : "Submit"} {/* Show loading text while submitting */}
					</button>
				</form>

				<button onClick={onClose} className="mt-6 text-center w-full text-red-600 font-semibold cursor-pointer">
					Cancel {/* Button to close the modal without submitting */}
				</button>
			</div>
		</div>
	);
}
