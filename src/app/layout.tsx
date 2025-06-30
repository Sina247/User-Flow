"use client";

// Import global CSS styles
import "./globals.css";

// Import the Redux store to provide state management
import { store } from "@/redux/store";

// Import Provider from react-redux to connect React with Redux
import { Provider } from "react-redux";

// RootLayout component to wrap the entire app with Redux Provider and set HTML structure
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="fa">
			<head>
				{/* Set the page title */}
				<title>User Flow Project</title>
				{/* Meta description for SEO and page info */}
				<meta name="description" content="A modern Next.js app with Redux Toolkit and Tailwind CSS for managing users via CRUD operations using reqres.in API. Responsive design and real-time updates." />
			</head>
			{/* Set the text direction to right-to-left for Persian language */}
			<body dir="rtl" className="bg-gray-100">
				{/* Wrap children components with Redux Provider for global state access */}
				<Provider store={store}>{children}</Provider>
			</body>
		</html>
	);
}
