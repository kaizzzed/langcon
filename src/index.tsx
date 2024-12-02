import React from "react";
import ReactDOM from "react-dom/client"; // Import createRoot
import App from "./App";
import { Provider } from "react-redux";
import "./index.scss";
import { store } from "./store/store";

// Create root for rendering
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
