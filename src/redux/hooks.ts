// Import TypeScript types for RootState and AppDispatch from the store configuration file
import type { RootState, AppDispatch } from "./store";

// Import React-Redux hooks along with TypedUseSelectorHook for typed selector usage
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

// Custom hook wrapping the standard useDispatch to provide properly typed dispatch function
// This ensures that dispatched actions conform to the types defined in AppDispatch,
// improving type safety and developer experience in the app
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed version of useSelector hook that is aware of the app's RootState shape
// This helps TypeScript correctly infer the types of the selected state slices,
// preventing errors and providing better autocompletion when selecting state in components
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
