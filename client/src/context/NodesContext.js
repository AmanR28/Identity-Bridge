import { createContext, useEffect, useState, useContext } from "react";
import { ethers } from "ethers";

import config from "../config";
import { UserContext } from "./UserContext";

const { ethereum } = window;
const { ADDRESS, ABI } = config.CONTRACT;

export const NodesContext = createContext();

export const NodesContextProvider = ({ children }) => {
	const { isValidConnection } = useContext(UserContext);

	const [contract, setContract] = useState(null);
	const [nodeStore, setNodeStore] = useState({});

	const getContract = async () => {
		if (!contract) {
			const validConnect = await isValidConnection();
			if (!validConnect) throw new Error("Invalid Connection");

			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const idContract = new ethers.Contract(ADDRESS, ABI, signer);

			setContract(idContract);
			return idContract;
		}
		return contract;
	};

	useEffect(() => console.log("Update Contract", contract), [contract]);

	const updateStore = (nodes, available = null) => {
		const newStore = { ...nodeStore };
		nodes.forEach((node) => {
			let nodeId = Number(node.nodeId);
			newStore[nodeId] = {
				isAvailable: available,
				...node,
				nodeId,
			};
		});
		console.log("Update Store", newStore);
		setNodeStore(newStore);
	};

	const getNodeById = async (id) => {
		const contract = await getContract();
		const node = await contract.getNodeById(id);

		updateStore([node]);

		return node;
	};

	const getNodesByIds = async (ids) => {
		const contract = await getContract();
		const nodes = await contract.getNodesByIds(ids);
		updateStore(nodes);
		return nodes;
	};

	const createNode = async (provider, api, key) => {
		const contract = await getContract();
		const tx = await contract.createNode(provider, api, key);
		const receipt = await tx.wait();
		const node = receipt.events[0].args;
		console.log(node);
		updateStore([node], true);
		return node;
	};

	const updateNode = async (nodeId, provider, api, key) => {
		const contract = await getContract();
		const tx = await contract.updateNode(nodeId, provider, api, key);
		const receipt = await tx.wait();
		const node = receipt.events[0].args;
		updateStore([node], true);
		return node;
	};

	const deleteNode = async (nodeId) => {
		const contract = await getContract();
		const tx = await contract.deleteNode(nodeId);
		const receipt = await tx.wait();
		const node = receipt.events[0].args;

		setNodeStore((pre) => {
			const newStore = { ...pre };
			delete newStore[nodeId];
			return newStore;
		});

		return node;
	};

	return (
		<NodesContext.Provider
			value={{
				nodeStore,
				createNode,
				updateNode,
				deleteNode,
				getNodesByIds,
				getNodeById,
			}}>
			{children}
		</NodesContext.Provider>
	);
};
