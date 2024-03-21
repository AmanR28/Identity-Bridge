import { ethers } from "ethers";

import config from "../config";

const { ethereum } = window;

const getContract = () => {
	const provider = new ethers.providers.Web3Provider(ethereum);
	const signer = provider.getSigner();
	const idpContract = new ethers.Contract(contractAddress, contractABI, signer);

	ethereum
		.request({ method: "eth_requestAccounts" })
		.then((res) => setAddress(res[0]));
};
