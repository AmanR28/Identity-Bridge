import { IUser } from "./user.interfaces";

export interface IVcData {
	nodeId: String;
	identifier: String;
	address: String;
	issuedAt: number;
}

export interface IVc {
	data: IVcData;
	sign: String;
}

export interface IVcResponse {
	vc: IVc;
	user: IUser;
}
