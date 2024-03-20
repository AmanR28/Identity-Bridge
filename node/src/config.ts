import fs from "fs";
require("dotenv").config();

const publicKeyRaw = fs.readFileSync("publicKey.hex", "utf-8");
const publicKey = Buffer.from(publicKeyRaw, "hex");

const privateKeyRaw = fs.readFileSync("privateKey.hex", "utf-8");
const privateKey = Buffer.from(privateKeyRaw, "hex");

import * as contractAbi from "./contract/abi.json";

export default {
	PORT: process.env.PORT || 3000,
	NODE: {
		PUBLIC_KEY: publicKey,
		PRIVATE_KEY: privateKey,
		PASSPHRASE: process.env.NODE_PASSPHRASE,
		ID: process.env.NODE_ID,
		PROVIDER: process.env.NODE_PROVIDER,
	},
	GOOGLE: {
		CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		CALLBACK: process.env.GOOGLE_CALLBACK,
	},
	CONTRACT: {
		ADDRESS: process.env.CONTRACT_ADDRESS,
		ABI: contractAbi.abi,
		JSON_RPC_URL: process.env.CONTRACT_JSON_RPC_URL,
	},
};
