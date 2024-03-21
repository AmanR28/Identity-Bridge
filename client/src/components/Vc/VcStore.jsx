import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const VcStore = () => {
	const location = useLocation();

	const [vc, setVc] = useState({});

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const vc = JSON.parse(searchParams.get("vc"));
		let newVcs = JSON.parse(localStorage.getItem(`vc_new`)) || [];
		newVcs.push(vc);
		localStorage.setItem(`vc_new`, JSON.stringify(newVcs));
		setVc(newVcs);
		window.close();
	}, [location.search]);
	return <div>Storing: {JSON.stringify(vc)}</div>;
};

export default VcStore;
