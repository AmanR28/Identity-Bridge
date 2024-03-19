const { ethers, network } = require("hardhat");

async function main() {
	console.log("Contract Identity Deploying on Network :", network.name);
	const Contract = await ethers.getContractFactory("Identity");
	const contract = await Contract.deploy();
	await contract.waitForDeployment();

	const address = await contract.getAddress();
	console.log("Contract Identity Deployed at " + address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
