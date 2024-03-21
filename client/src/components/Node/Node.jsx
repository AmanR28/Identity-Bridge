import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import React, { useContext } from "react";

import { UserContext } from "../../context/UserContext";

const Node = ({ node, handleEdit }) => {
	const { user } = useContext(UserContext);

	return (
		<Paper variant="elevation" elevation={2}>
			<Grid container sx={{ my: 2, p: 2 }}>
				<Grid item xs={5}>
					<Typography>NodeId: {Number(node.nodeId)}</Typography>
					<Typography>Provider: {node.provider}</Typography>
					<Typography>
						Available: {node.isAvailable ? "true" : "false"}
					</Typography>
				</Grid>

				<Grid item xs={5}>
					<Typography>Api: {node.api}</Typography>
					<br />
					<Typography noWrap>Host: {node.host}</Typography>
				</Grid>

				<Grid item xs={2} sx={{ py: 1 }}>
					<Button
						variant="contained"
						onClick={handleEdit}
						disabled={
							!node.isAvailable ||
							node.host.toLowerCase() !== user.toLowerCase()
						}>
						Edit
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Node;
