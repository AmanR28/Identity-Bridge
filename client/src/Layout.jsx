import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

function Layout() {
	return (
		<React.Fragment>
			<CssBaseline />
			<Header />
			<Outlet />
		</React.Fragment>
	);
}

export default Layout;
