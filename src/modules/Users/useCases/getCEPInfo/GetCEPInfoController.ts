import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCEPInfoUseCase } from "./GetCEPInfoUseCase";
import getClient from '../../../../utils/redis';

class GetCEPInfoController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { cep } = request.params;
        
        const client = getClient();
        await client.connect();

        if (!cep) {
            return response.status(400).send("Campo 'cep' esperado!");    
        }

        if (! await client.exists(`${cep}`)) {
            const getCEPInfoUseCase = container.resolve(GetCEPInfoUseCase);
    
            const cepInfo = await getCEPInfoUseCase.execute(String(cep));
    
            await client.set(`${cep}`, JSON.stringify(cepInfo));
            await client.expire(`${cep}`, 600);
            
            return response.status(200).send(cepInfo);
        } else {
            const cepInfo = await client.get(`${cep}`);

            return response.status(200).send(cepInfo);
        }
    }
}

export { GetCEPInfoController }