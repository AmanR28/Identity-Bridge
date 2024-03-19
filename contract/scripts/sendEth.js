const { ethers, network } = require("hardhat");

const ACCOUNT = "0x63C82DfFf38C0327AEFCd87e218Ec46F9246E00f";

async function main() {
	const [signer] = await ethers.getSigners();
	const tx = await signer.sendTransaction({
		to: ACCOUNT,
		value: ethers.parseEther("1.0"),
	});
	const receipt = await tx.wait();
	console.log(receipt);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
