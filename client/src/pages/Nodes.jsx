import React, { useContext, useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Node from "../components/Node/Node";

import NodeAdd from "../components/Node/NodeAdd";

import { NodesContext } from "../context/NodesContext";
import NodeEdit from "../components/Node/NodeEdit";

const localGet = (item) => JSON.parse(localStorage.getItem(item));
const localSet = (item, data) =>
	localStorage.setItem(item, JSON.stringify(data));

const Nodes = () => {
	const { nodeStore, getNodesByIds } = useContext(NodesContext);

	const [editNode, setEditNode] = useState();

	useEffect(() => {
		(async () => {
			await getNodesByIds(localGet("nodes") || []);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (nodeStore) {
			const newIds = [];
			Object.keys(nodeStore).map((id) => newIds.push(id));
			localSet("nodes", newIds, nodeStore);
		}
	}, [nodeStore]);

	return (
		<Container component="main" maxWidth="md" sx={{ my: 10 }}>
			<Paper variant="elevation" elevation={1} sx={{ my: 10, p: 2 }}>
				<Typography variant="h4" align="center">
					Node Management
				</Typography>

				<Container sx={{ m: 5 }}>
					{Object.entries(nodeStore).map(([id, node]) => (
						<Node key={id} node={node} handleEdit={() => setEditNode(node)} />
					))}
				</Container>

				<NodeAdd />
				<NodeEdit node={editNode} handleClose={() => setEditNode(null)} />
			</Paper>
		</Container>
	);
};

export default Nodes;
