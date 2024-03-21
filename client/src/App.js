import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { UserContext } from "./context/UserContext";

import "./style.scss";
import Login from "./pages/Login";
import Vcs from "./pages/Vcs";
import Layout from "./Layout";
import Nodes from "./pages/Nodes";
import VpRequest from "./components/Vp/VpRequest";
import VcStore from "./components/Vc/VcStore";

const PrivateRoute = ({ isAuth, children }) => {
	const currentURL = new URL(window.location.href);
	const redirect =
		"/login" +
		(`?redirect=${encodeURIComponent(
			currentURL.pathname + currentURL.search
		)}` || "");
	return isAuth ? children : <Navigate to={redirect} />;
};

const App = () => {
	const { user } = useContext(UserContext);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route exact path="/vc/store" element={<VcStore />} />
				<Route
					path="/"
					element={
						<PrivateRoute isAuth={user}>
							<Layout />
						</PrivateRoute>
					}>
					<Route path="/vc" element={<Vcs />} />
					<Route path="/node" element={<Nodes />} />

					<Route path="/vp/request" element={<VpRequest />} />

					<Route path="/" element={<Navigate to="/vc" />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
