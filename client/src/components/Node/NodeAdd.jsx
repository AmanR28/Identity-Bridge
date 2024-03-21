import React, { useContext, useState } from "react";

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";

import { NodesContext } from "../../context/NodesContext";

const NodeAdd = () => {
	const { getNodeById, createNode } = useContext(NodesContext);

	const [inputNode, setInputNode] = useState("");

	const [data, setData] = useState({
		provider: "",
		api: "",
		key: "",
	});

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const getNode = async () => {
		await getNodeById(inputNode);
		setInputNode("");
	};

	const handleChange = (e) => {
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleCreate = async ({ provider, api, key }) => {
		await createNode(provider, api, key);
		handleClose();
	};

	return (
		<Container>
			<Grid container justifyContent="center" spacing={2} align="center">
				<Grid item xs={3}>
					<Paper
						component="form"
						sx={{
							display: "flex",
							alignItems: "center",
							width: 200,
						}}>
						<InputBase
							sx={{ ml: 1, flex: 1 }}
							placeholder="Node Id"
							value={inputNode}
							onChange={(e) => setInputNode(e.target.value)}
						/>
						<Button type="button" variant="contained" onClick={getNode}>
							Get Node
						</Button>
					</Paper>
				</Grid>
				<Grid item xs={3}>
					<Button variant="contained" onClick={handleOpen}>
						Create Node
					</Button>
				</Grid>
			</Grid>

			<Dialog open={open}>
				<DialogTitle sx={{ textAlign: "center" }}>Create Node</DialogTitle>
				<DialogContent sx={{ paddingBottom: 0 }}>
					<Paper
						sx={{
							display: "flex",
							m: 1,
						}}>
						<Typography variant="subtitle1" sx={{ m: 1, width: "60px" }}>
							Provider
						</Typography>
						<InputBase
							sx={{ m: 1, flex: 1 }}
							placeholder="Provider"
							name="provider"
							onChange={handleChange}
						/>
					</Paper>
					<Paper
						sx={{
							display: "flex",
							m: 1,
						}}>
						<Typography variant="subtitle1" sx={{ m: 1, width: "70px" }}>
							API
						</Typography>
						<InputBase
							sx={{ flex: 1 }}
							placeholder="Api"
							name="api"
							onChange={handleChange}
						/>
					</Paper>

					<Paper
						sx={{
							display: "flex",
							m: 1,
						}}>
						<Typography variant="subtitle1" sx={{ m: 1, width: "70px" }}>
							Key
						</Typography>
						<InputBase
							sx={{ marginBottom: 1, flex: 1 }}
							placeholder="Key"
							name="key"
							onChange={handleChange}
						/>
					</Paper>
				</DialogContent>
				<DialogActions sx={{ marginBottom: 1, marginRight: 2 }}>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={() => handleCreate(data)}>Create</Button>
				</DialogActions>
			</Dialog>
		</Container>
	);
};

export default NodeAdd;
