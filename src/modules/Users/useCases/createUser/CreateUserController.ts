import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";
import ValidateAndReturnCPF from "../../utils/ValidateAndReturnCPF";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            nome,
            telefone,
            cpf,
            cep
        } = request.body;

        if (!nome || !telefone || !cpf || !cep) {
            return response.status(400).send({error: 400, message: 'Preencha todos os campos'});
        }

        let cpfRep = await ValidateAndReturnCPF(cpf);

        if (!cpfRep) {
            return response.status(400).send({error: 400, message: 'CPF inválido'});
        }

        const telefoneRep = telefone.replace(/\D+/g, "");

        const createUserUseCase = container.resolve(CreateUserUseCase);

        const user = await createUserUseCase.execute({
            nome: nome,
            telefone: telefoneRep,
            cpf: cpfRep,
            cep: cep
        })

        delete user.id;
        return response.status(201).send(user);
    }
}

export { CreateUserController }