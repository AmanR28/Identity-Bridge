import React, { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import { formatDistanceToNowStrict } from "date-fns";

const VcRequest = ({ vcData, node, vc, handleGet, handleSelect }) => {
	const [state, setState] = useState(false);
	const timeAgo = (date) =>
		formatDistanceToNowStrict(new Date(date), {
			addSuffix: true,
		});

	const handleClick = (vc) => {
		handleSelect(!state, vc);
		setState(!state);
	};

	const isValid = () => {
		const expirationTime = vc.vc.data.issuedAt + vcData.expiry;
		return expirationTime > Date.now();
	};

	return (
		<>
			{vc && isValid() ? (
				<Paper variant="elevation" elevation={2}>
					<Grid container sx={{ my: 2, p: 2 }}>
						<Grid item xs={3}>
							<Typography>NodeId: {node.nodeId}</Typography>
							<Typography>Provide: {node.provider}</Typography>
						</Grid>

						<Grid item xs={8}>
							<Typography>User: {vc.user.username}</Typography>
							<Typography>IssuedAt: {timeAgo(vc.vc.data.issuedAt)}</Typography>
						</Grid>

						<Grid item xs={1} sx={{ py: 1 }}>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											name="Select"
											onChange={() => handleClick(vcData)}
										/>
									}
									label={"+" + vcData.score}
								/>
							</FormGroup>
						</Grid>
					</Grid>
				</Paper>
			) : (
				<Paper variant="elevation" elevation={2}>
					<Grid container sx={{ my: 2, p: 2 }}>
						<Grid item xs={3}>
							<Typography>NodeId: {node.nodeId}</Typography>
							<Typography>Provide: {node.provider}</Typography>
						</Grid>

						<Grid item xs={8}>
							<Typography>Api: {node.api}</Typography>
							<Typography noWrap>Host: {node.host}</Typography>
						</Grid>

						<Grid item xs={1} sx={{ py: 1 }}>
							<Button
								key={node.nodeId}
								variant="contained"
								onClick={() => handleGet(node.api)}>
								Get
							</Button>
						</Grid>
					</Grid>
				</Paper>
			)}
		</>
	);
};

export default VcRequest;
