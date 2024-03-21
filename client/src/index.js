import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { UserContextProvider } from "./context/UserContext";
import { NodesContextProvider } from "./context/NodesContext";
import { VcContextProvider } from "./context/VcContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	// <React.StrictMode>
	// <ThemeProvider>
	<UserContextProvider>
		<NodesContextProvider>
			<VcContextProvider>
				<App />
			</VcContextProvider>
		</NodesContextProvider>
	</UserContextProvider>
	// </ThemeProvider>
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
