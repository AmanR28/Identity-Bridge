import React, { createContext, useEffect, useState } from "react";

import config from "../config";

export const UserContext = createContext();

const { ethereum } = window;
const { CHAIN_ID, CHAIN_NAME, CHAIN_URL } = config.CONTRACT;

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState("");

	useEffect(() => {
		console.log("Update: User", user);
	}, [user]);

	const isConnected = () => {
		return ethereum.selectedAddress != null;
	};
	const isValidChain = async () => {
		const chainId = await ethereum.request({ method: "eth_chainId" });
		return chainId === CHAIN_ID;
	};

	const requestConnect = async () => {
		const accounts = await ethereum
			.request({ method: "eth_requestAccounts" })
			.catch((err) => {
				if (err.code === 4001) alert("Please Connect to Proceed!");
				else console.error(err);
			});
		setUser(accounts[0]);
	};

	const requestChain = async () => {
		try {
			await ethereum.request({
				method: "wallet_switchEthereumChain",
				params: [{ chainId: CHAIN_ID }],
			});
		} catch (switchError) {
			if (switchError.code === 4902) {
				try {
					await ethereum.request({
						method: "wallet_addEthereumChain",
						params: [
							{
								chainId: CHAIN_ID,
								chainName: CHAIN_NAME,
								rpcUrls: [CHAIN_URL],
								nativeCurrency: {
									name: "MATIC",
									symbol: "MATIC",
									decimals: 18,
								},
							},
						],
					});
				} catch (addError) {
					console.error(addError);
				}
			}
		}
	};

	const isValidConnection = async () => {
		const validChain = await isValidChain();
		return isConnected() && validChain;
	};

	const requestLogin = () => {
		return new Promise(async (resolve, reject) => {
			if (!ethereum) {
				alert("Install Metamask");
				throw new Error("Install Metamask");
			}

			try {
				if (!isConnected()) await requestConnect();

				const checkChain = await isValidChain();
				if (!checkChain) await requestChain();

				setUser(ethereum.selectedAddress);
				resolve(ethereum.selectedAddress);
			} catch (err) {
				reject();
			}
		});
	};

	const signData = async (data) => {
		const sign = await ethereum.request({
			method: "personal_sign",
			params: [data, user],
		});
		return sign;
	};

	return (
		<UserContext.Provider
			value={{ user, requestLogin, isValidConnection, signData }}>
			{children}
		</UserContext.Provider>
	);
};
