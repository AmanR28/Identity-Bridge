import contractAbi from "./contract/abi.json";

const config = {
	SELF_URL: process.env.REACT_APP_SELF_URL,
	CONTRACT: {
		ADDRESS: process.env.REACT_APP_CONTACT_ADDRESS,
		ABI: contractAbi.abi,
		CHAIN_ID: process.env.REACT_APP_CONTRACT_CHAIN_ID,
		CHAIN_NAME: process.env.REACT_APP_CONTRACT_CHAIN_NAME,
		CHAIN_URL: process.env.REACT_APP_CONTRACT_CHAIN_URL,
	},
};

export default config;
