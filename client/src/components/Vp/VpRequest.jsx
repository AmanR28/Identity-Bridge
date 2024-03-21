import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import VcRequest from "./VcRequest";

import { NodesContext } from "../../context/NodesContext";
import { VcContext } from "../../context/VcContext";
import { UserContext } from "../../context/UserContext";

const VpRequest = () => {
	const location = useLocation();
	const { getNodesByIds } = useContext(NodesContext);
	const { mapVc, requestVc } = useContext(VcContext);
	const { user, signData } = useContext(UserContext);

	const [site, setSite] = useState("");
	const [callback, setCallback] = useState("");

	const [vcsData, setVcsData] = useState([]);
	const [nodes, setNodes] = useState({});

	const [score, setScore] = useState(0);
	const [reqScore, setReqScore] = useState(0);

	const [selectedVc, setSelectedVc] = useState(new Set());

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);

		setSite(searchParams.get("site"));
		setCallback(searchParams.get("callback"));

		(async () => {
			const vp = JSON.parse(searchParams.get("vp"));

			const ids = [];
			const vcsData = vp.vc;
			vcsData.forEach((vc) => ids.push(vc.nodeId));

			const nodes = await getNodesByIds(ids);
			let mapNodes = {};
			nodes.forEach(
				(node) =>
					(mapNodes[node.nodeId] = {
						...node,
						nodeId: Number(node.nodeId),
					})
			);

			setNodes(mapNodes);
			setVcsData(vcsData);
			setReqScore(vp.minScore);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	const handleGetVc = (api) => {
		requestVc(api);
	};

	const handleSelectVc = (state, v) => {
		if (state) {
			setScore((pre) => pre + v.score);
			setSelectedVc((prev) => new Set([...prev, v.nodeId]));
		} else {
			setScore((pre) => pre - v.score);
			setSelectedVc((prev) => {
				const newSet = new Set(prev);
				newSet.delete(v.nodeId);
				return newSet;
			});
		}
	};

	const handleSend = async () => {
		const vc = Array.from(selectedVc).map((id) => {
			return mapVc[id].vc;
		});
		const data = {
			vc,
			site,
			issuer: user,
			issuedAt: new Date(),
		};
		const sign = await signData(JSON.stringify(data));
		console.log("s", sign);
		console.log("s", sign.slice(2));
		const vp = { data, sign: sign };

		const url = callback + "?vp=" + encodeURIComponent(JSON.stringify(vp));
		console.log(url);
		window.open(url, "_self");
	};

	useEffect(() => {
		console.log("Saved Vcs : ", mapVc);
	}, [mapVc]);

	return (
		<Container component="main" maxWidth="md" sx={{ my: 10 }}>
			<Paper variant="elevation" elevation={1} sx={{ my: 10, p: 2 }}>
				<Typography component="h1" variant="h4" align="center">
					Generate VP for {site}
				</Typography>

				<Container sx={{ my: 5 }}>
					{vcsData.map((vcData, i) => (
						<VcRequest
							key={i}
							vcData={vcData}
							node={nodes[vcData.nodeId]}
							vc={mapVc[vcData.nodeId]}
							handleGet={handleGetVc}
							handleSelect={handleSelectVc}
						/>
					))}
				</Container>

				<Grid container justifyContent="center" spacing={3}>
					<Grid item>
						<Typography variant="h6">
							Score: {score} / {reqScore}
						</Typography>
					</Grid>
					<Grid item>
						<Button
							type="button"
							variant="contained"
							disabled={score < reqScore}
							onClick={handleSend}>
							Send
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default VpRequest;
