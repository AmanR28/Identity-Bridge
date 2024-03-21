import React, { useState, useContext, useEffect } from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Vc from "../components/Vc/Vc";
import { VcContext } from "../context/VcContext";

const Vcs = () => {
	const { mapVc, deleteVc } = useContext(VcContext);

	console.log("mapVc", mapVc);

	const handleDelete = (nodeId) => {
		deleteVc(nodeId);
	};

	return (
		<Container component="main" maxWidth="md" sx={{ my: 10 }}>
			<Paper variant="elevation" elevation={1} sx={{ my: 10, p: 2 }}>
				<Typography component="h1" variant="h4" align="center">
					VC Management
				</Typography>

				<Container sx={{ my: 5 }}>
					{Object.entries(mapVc).map(([id, vc]) => (
						<Vc key={id} vc={vc} handleDelete={handleDelete} />
					))}
				</Container>
			</Paper>
		</Container>
	);
};

export default Vcs;
