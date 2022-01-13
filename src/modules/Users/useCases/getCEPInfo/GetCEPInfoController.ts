import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCEPInfoUseCase } from "./GetCEPInfoUseCase";
import { getClient } from '../../../../utils/redis';
import { IUserCEPInfoDTO } from "modules/Users/dtos/IUserCEPInfoDTO";

class GetCEPInfoController {
    async handle(request: Request, response: Response): Promise<Response> {
        let { cep } = request.params;
        cep = cep?.replace(/\D+/g, "");

        const client = getClient();

        await process.nextTick(() => {}); // Workaround again to prevent jest from detecting this as an open handle when testing 
        await client.connect();

        if (!cep) {
            return response.status(400).send("CEP não informado!");    
        }

        if (cep.length != 8) {
            return response.status(400).send("CEP inválido!");    
        }

        if (! await client.exists(`${cep}`)) {
            const getCEPInfoUseCase = container.resolve(GetCEPInfoUseCase);
    
            const cepInfo = await getCEPInfoUseCase.execute(String(cep));
    
            await client.set(`${cep}`, JSON.stringify(cepInfo));
            await client.expire(`${cep}`, 600);
            
            return response.status(200).send(cepInfo);
        } else {
            const cepInfo: IUserCEPInfoDTO = JSON.parse(await client.get(`${cep}`));

            return response.status(200).send(cepInfo);
        }
    }
}

export { GetCEPInfoController }