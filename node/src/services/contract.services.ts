import { ethers } from "ethers";
import config from "../config";

const { ADDRESS, ABI, JSON_RPC_URL } = config.CONTRACT;
const provider = new ethers.JsonRpcProvider(JSON_RPC_URL);
const contract = new ethers.Contract(ADDRESS!, ABI, provider);

export const verifyNode = async () => {
	const { ID, PROVIDER, PUBLIC_KEY } = config.NODE;
	if (!ID || !PROVIDER || !PUBLIC_KEY) throw new Error("Missing Node Info");

	const node = await contract.getNodeById(ID);

	const nodeId = BigInt(node.nodeId).toString();
	if (ID !== nodeId)
		throw new Error(
			"Mismatch Node ID \n\t Received: " + nodeId + "\n\t Exist: " + ID
		);
	else console.log("\n\tNode ID: " + nodeId);

	if (PROVIDER !== node.provider)
		throw new Error(
			"Mismatch Node Provider \n\t Received: " +
				node.provider +
				"\n\t Exist: " +
				PROVIDER
		);
	else console.log("\tProvider: " + PROVIDER);

	if (PUBLIC_KEY.toString("hex") !== node.key)
		throw new Error(
			"Mismatch Node Key \n\t Received: " +
				node.key +
				"\n\t Exist: " +
				PUBLIC_KEY
		);
	else console.log("\tKey: ", PUBLIC_KEY.toString("hex"));

	if (!node.isAvailable) throw new Error("Node Not Available");
};
