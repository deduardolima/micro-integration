import { Injectable } from "@nestjs/common";
import { cpf } from "cpf-cnpj-validator";


@Injectable()
export class Authenticator {
    public getTokenData(token: string) {
        if (token && token.startsWith("Bearer ")) {
            const jwtToken = token.split("Bearer ")[1];
            const cpf = this.extractCPFFromToken(jwtToken);

            if (!cpf) {
                console.log("Token inválido ou não contém o campo CPF");
                return null;
            }
            return cpf;
        } else {
            console.log("Token inválido ou não fornecido");
            return null;
        }
    };
    private extractCPFFromToken(token: string): string | null {
        const payload = this.decodePayload(token);
        return this.getCPFFromPayload(payload);
    };

    private decodePayload(token: string): any {
        const tokenParts = token.split(".");

        if (tokenParts.length !== 3) {
            return null;
        }

        const payload = Buffer.from(tokenParts[1], "base64").toString("utf-8");
        return JSON.parse(payload);
    };
    private getCPFFromPayload(payload: any): string | null {
        if (payload && payload.hasOwnProperty('data.CPFNumber')) {
            const cpf = payload['data.CPFNumber'];
            return this.isValidCPF(cpf) ? cpf : null;
        }
        return null;
    };
    private isValidCPF(num: string): boolean {
        return cpf.isValid(num);
    };
}
