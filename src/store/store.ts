import { createStore } from "redux";
import reducer from "./reducer"; // Assume you have a reducer.

const store = createStore(reducer);

export { store };