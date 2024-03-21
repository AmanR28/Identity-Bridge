import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

const Header = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Identity
					</Typography>

					<NavLink to="/vc">
						<Button sx={{ color: "white" }}>Manage Vc</Button>
					</NavLink>
					<NavLink to="/node">
						<Button sx={{ color: "white" }}>Manage Nodes</Button>
					</NavLink>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
