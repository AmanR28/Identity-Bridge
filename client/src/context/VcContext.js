import { createContext, useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";

import config from "../config";

export const VcContext = createContext();

export const VcContextProvider = ({ children }) => {
	const { user } = useContext(UserContext);
	const [mapVc, setMapVc] = useState({});

	const refreshVCs = async () => {
		let ids = JSON.parse(localStorage.getItem("vcs")) || [];

		let vcs = {};
		ids.forEach((id) => {
			let vc = JSON.parse(localStorage.getItem(`vc_${id}`));
			if (vc) vcs[id] = vc;
		});
		setMapVc(vcs);
	};

	useEffect(() => {
		refreshVCs();
		setInterval(checkForNewVcs, 500);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const saveNewVC = (vc) => {
		let ids = new Set(JSON.parse(localStorage.getItem("vcs")) || []);
		let nodeId = vc.vc.data.nodeId;
		ids.add(nodeId);
		localStorage.setItem("vcs", JSON.stringify(Array.from(ids)));
		localStorage.setItem("vc_" + nodeId, JSON.stringify(vc));
		setMapVc((prev) => ({ ...prev, nodeId: vc }));
	};

	const checkForNewVcs = () => {
		let newVcs = JSON.parse(localStorage.getItem(`vc_new`));
		localStorage.removeItem("vc_new");

		if (newVcs) {
			newVcs.forEach((vc) => {
				saveNewVC(vc);
			});
			refreshVCs();
		}
	};

	const deleteVc = (nodeId) => {
		let ids = Array.from(JSON.parse(localStorage.getItem("vcs"))) || [];
		let idxRemove = ids.indexOf(nodeId);
		if (idxRemove > -1) {
			ids.splice(idxRemove, 1);
			localStorage.removeItem("vc_" + nodeId);
			refreshVCs();
		}
	};

	const requestVc = async (api) => {
		const address = user;
		const selfUrl = config.SELF_URL;

		const url =
			api + "auth?address=" + address + "&callback=" + selfUrl + "vc/store";

		const width = 600;
		const height = 600;
		const left = window.innerWidth / 2 - width / 2;
		const top = window.innerHeight / 2 - height / 2;
		window.open(
			url,
			"_blank",
			`width=${width}, height=${height}, top=${top}, left=${left}`
		);
		console.log(url);
	};

	return (
		<VcContext.Provider value={{ refreshVCs, mapVc, requestVc, deleteVc }}>
			{children}
		</VcContext.Provider>
	);
};
