import express from "express";
import config from "./config";
import passport from "passport";

import { generate } from "./services/certificate.services";
import { verifyNode } from "./services/contract.services";

import { IUser } from "./interfaces/user.interfaces";

const app = express();

app.use(passport.initialize());
require("./services/passport.services");

app.get("/", (req, res) => {
	const { ID, PROVIDER, PUBLIC_KEY } = config.NODE;

	const node = {
		id: ID,
		provider: PROVIDER,
		key: PUBLIC_KEY,
	};

	res.send(node);
});

app.get("/auth/", (req, res) => {
	const address = req.query.address;
	const callback = req.query.callback;

	if (!address || !callback) {
		return res.send("Missing Info");
	}

	passport.authenticate("google", {
		session: false,
		scope: ["profile", "email"],
		state: JSON.stringify([address, callback]),
	})(req, res);
});

app.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		session: false,
		scope: ["profile", "email"],
	}),
	async (req, res) => {
		const state: string[] = JSON.parse(req.query.state as string);
		const [address, callback] = state;
		const user = req.user as IUser;

		try {
			await verifyNode();
			const vc = generate(address, user);

			const url = callback + "?vc=" + JSON.stringify(vc);
			// res.send(url);
			res.redirect(url);
		} catch (err) {
			console.error(err);
		}
	}
);

app.listen(config.PORT, async () => {
	console.log("Server is running on port ", config.PORT);

	console.log("Verifying node ...");

	try {
		await verifyNode();
		console.log("\n\t ... Node Verified ...");
	} catch (err) {
		console.error("Node Verification Error\n", err);
	}
});
