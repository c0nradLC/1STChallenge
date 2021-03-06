import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { hash } from "bcrypt";

import { ListUserByCPFUseCase } from "./ListUserByCPFUseCase";

class ListUserByCPFController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { cpf } = request.params;

        if (!cpf) {
            return response.status(400).send({error: 400, message: "CPF não informado"});    
        }

        const listUserByCPFUseCase = container.resolve(ListUserByCPFUseCase);
    
        const cpfRep = await hash(cpf.replace(/\D+/g, ""), process.env.BCRYPT_SALT);

        const user = await listUserByCPFUseCase.execute(cpfRep);
    
        if (!user) {
            return response.status(422).send({error: 422, message: "Usuário não encontrado"});
        }

        return response.status(200).send(user);
    }
}

export { ListUserByCPFController }