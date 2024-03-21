import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { UserContext } from "../context/UserContext";

const Login = () => {
	const navigate = useNavigate();
	const { requestLogin } = useContext(UserContext);

	const handleLogin = async () => {
		try {
			await requestLogin();

			const redirectParam = new URLSearchParams(window.location.search).get(
				"redirect"
			);
			const redirect = redirectParam
				? decodeURIComponent(redirectParam)
				: "/vc";

			navigate(redirect);
		} catch (err) {
			console.error("Login Failed", err);
		}
	};

	return (
		<Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
			<Paper
				variant="outlined"
				elevation={0}
				sx={{ my: { xs: 3, md: 10 }, p: { xs: 2, md: 3 } }}>
				<Typography component="h1" variant="h4" align="center">
					Identity Login
				</Typography>

				<Container
					component="main"
					maxWidth="sm"
					sx={{ my: { md: 3 } }}
					align="center">
					<Button
						onClick={handleLogin}
						sx={{ mt: 3, ml: 1 }}
						variant="contained">
						Sign In With Metamask
					</Button>
				</Container>
			</Paper>
		</Container>
	);
};

export default Login;
