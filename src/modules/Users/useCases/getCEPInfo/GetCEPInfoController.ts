import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetCEPInfoUseCase } from "./GetCEPInfoUseCase";
import { IUserCEPInfoDTO } from "../../dtos/IUserCEPInfoDTO";

class GetCEPInfoController {
    async handle(request: Request, response: Response): Promise<Response> {
        let { cep } = request.params;
        cep = cep?.replace(/\D+/g, "");

        if (!cep) {
            return response.status(400).send({error: 400, message: "CEP não informado!"});    
        }

        if (cep.length != 8) {
            return response.status(400).send({error: 400, message: "CEP inválido!"});    
        }

        const getCEPInfoUseCase = container.resolve(GetCEPInfoUseCase);

        const cepInfo: IUserCEPInfoDTO = await getCEPInfoUseCase.execute(cep);

        return response.status(200).send(cepInfo);
    }
}

export { GetCEPInfoController }