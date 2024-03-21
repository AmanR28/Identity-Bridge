import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { formatDistanceToNowStrict } from "date-fns";
import React from "react";

const Vc = ({ vc, handleDelete }) => {
	const timeAgo = (date) =>
		formatDistanceToNowStrict(new Date(date), {
			addSuffix: true,
		});

	console.log("asdf", vc);

	return (
		<Paper variant="elevation" elevation={2}>
			<Grid container sx={{ my: 2, p: 2 }} spacing={1}>
				<Grid item xs={4}>
					<Typography>NodeId: {vc.vc.data.nodeId}</Typography>
					<Typography>User: {vc.user.username}</Typography>
				</Grid>

				<Grid item xs={6}>
					<Typography>IssuedAt: {timeAgo(vc.vc.data.issuedAt)}</Typography>
					<Typography noWrap>Address: {vc.vc.data.address}</Typography>
				</Grid>

				<Grid item xs={2} sx={{ py: 1 }}>
					<Button
						variant="contained"
						onClick={() => handleDelete(vc.vc.data.nodeId)}>
						Delete
					</Button>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Vc;
