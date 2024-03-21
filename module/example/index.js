const Identity = require("../");

const express = require("express");

const app = express();

const PORT = process.env.PORT || 3030;

// const HOST = "http://localhost:3001";
// const HOST = "https://ib-client.onrender.com";
// const CALLBACK = "http://localhost:3030/callback";
// const CALLBACK = "https://ib-module.onrender.com/callback";

const HOST = process.env.HOST;
const CALLBACK = process.env.CALLBACK;

const SITE = "localhost";

const VcInfo = [
	{
		nodeId: 1,
		expiry: 60 * 60 * 1000,
		score: 1,
	},
];

const identity = new Identity({
	host: HOST,
	site: SITE,
	callback: CALLBACK,
	vp: {
		vc: VcInfo, // Req
		minScore: 1,
		defaultExpiry: 60 * 60 * 1000,
		defaultScore: 1,
	},
});

setTimeout(() => {
	console.log("🚀 ~ app.get ~ identity.getUrl:", identity.getUrl());
}, 2000);

app.get("/", (req, res) => {
	res.send(`<a href="${identity.getUrl()}">Sign In With Identity</a>`);
});

app.get("/callback", (req, res) => {
	const vp = JSON.parse(decodeURIComponent(req.query.vp));

	const verify = identity.verify(vp);

	let vcData = "<ui>";
	vp.data.vc.forEach((v) => {
		vcData += `<li>Node: ${v.data.nodeId} | Identifier: ${v.data.identifier} | Issued At: ${v.data.issuedAt}</li>`;
	});
	vcData += `</ui>`;

	res.send(`
	<html><body>
	<h1>Received VP</h1>
	${vcData}
	<h3>Verified: ${verify}</h3>
	</body></html>
	`);
});

app.listen(PORT, async () => {
	console.log("Server is running on port ", PORT);
});
