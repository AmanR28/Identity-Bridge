import crypto from "crypto";

import config from "../config";
import { IUser } from "../interfaces/user.interfaces";
import { IVcData, IVcResponse } from "../interfaces/vc.interfaces";

const nodeId = config.NODE.ID!;

export const generate = (address: String, user: IUser): IVcResponse => {
	const data: IVcData = {
		nodeId,
		identifier: user.id,
		address,
		issuedAt: Date.now(),
	};

	const sign = crypto.createSign("SHA256");
	sign.update(JSON.stringify(data));
	sign.end();
	const signature = sign.sign(
		{ key: config.NODE.PRIVATE_KEY, format: "der", type: "pkcs8" },
		"hex"
	);

	const certificate: IVcResponse = {
		vc: {
			data,
			sign: signature,
		},
		user,
	};

	return certificate;
};
