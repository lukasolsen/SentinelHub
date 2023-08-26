import { createStore } from "redux";
import { themeReducer } from "../Slice/ThemeSlice";

// Initial state
// Create store
const store = createStore(themeReducer);

export default store;
