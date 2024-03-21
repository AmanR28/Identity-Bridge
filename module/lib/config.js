const contractAbi = require("./contract/abi.json");

// const CONTRACT_ADDRESS = "0x5dF64e3DE6FB36F610b01007AaAFd9349aA44253";
// const CONTRACT_JSON_RPC_URL = "HTTP://127.0.0.1:7545";

const CONTRACT_ADDRESS = "0x4704Af448b734e5811E6d1455973B02B1CA05A46";
const CONTRACT_JSON_RPC_URL = "https://1rpc.io/sepolia";

module.exports = {
	CONTRACT: {
		ABI: contractAbi.abi,
		ADDRESS: CONTRACT_ADDRESS,
		JSON_RPC_URL: CONTRACT_JSON_RPC_URL,
	},
};
