import React, { useEffect, useState, useContext } from "react";

import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";

import { NodesContext } from "../../context/NodesContext";

const NodeEdit = ({ node, handleClose }) => {
	const { updateNode, deleteNode } = useContext(NodesContext);

	const [data, setData] = useState({
		nodeId: 0,
		provider: "",
		api: "",
		key: "",
	});

	useEffect(() => {
		if (node) {
			const { nodeId, provider, api, key } = node;
			setData({ nodeId: Number(nodeId), provider, api, key });
		}
	}, [node]);

	const handleChange = (e) => {
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleUpdate = async () => {
		await updateNode(data.nodeId, data.provider, data.api, data.key);
		handleClose();
	};

	const handleDelete = async () => {
		await deleteNode(data.nodeId);
		handleClose();
	};

	return (
		<Dialog open={node ? true : false} onClose={handleClose}>
			<DialogTitle sx={{ textAlign: "center" }}>
				Edit Node {data.nodeId}
			</DialogTitle>

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
						value={data.provider}
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
						value={data.api}
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
						value={data.key}
						onChange={handleChange}
					/>
				</Paper>
			</DialogContent>
			<DialogActions sx={{ marginBottom: 1, marginRight: 2 }}>
				<Button onClick={handleDelete}>Delete</Button>
				<Button onClick={handleUpdate}>Update</Button>
			</DialogActions>
		</Dialog>
	);
};

export default NodeEdit;
