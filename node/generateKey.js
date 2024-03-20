const crypto = require("crypto");
const fs = require("fs");

function generateKeyPair() {
	const keys = crypto.generateKeyPairSync("rsa", {
		modulusLength: 2048,
	});

	const publicKey = keys.publicKey
		.export({ format: "der", type: "spki" })
		.toString("hex");
	const privateKey = keys.privateKey
		.export({ format: "der", type: "pkcs8" })
		.toString("hex");

	fs.writeFileSync("publicKey.hex", publicKey);
	fs.writeFileSync("privateKey.hex", privateKey);

	console.log("Generated Public Key : \n");
	console.log(publicKey);
}
generateKeyPair();
