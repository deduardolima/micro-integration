import { Injectable } from "@nestjs/common";
import Gigya, { DataCenter } from 'gigya-node';


@Injectable()
export class CdcService {
	constructor() { }

	private gigya = new Gigya(
		process.env.SAP_PROD,
		'us1' as DataCenter,
		process.env.SAP_SECRET_KEY,
	);

	async getAccountbyUID(UID: string): Promise<any> {
		const user: any = await this.gigya.accounts.getAccountInfo({ UID });
		return user ? user : user.errorMessage;
	};
	async getTokenUID(UID: string) {
		const token: any = await this.gigya.accounts.getJWT({ targetUID: UID, fields: 'data.CPFNumber, username' });
		return token ? token.id_token : false;
	};


}


