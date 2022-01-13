import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

import { hash } from 'bcrypt';

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            nome,
            telefone,
            cpf,
            cep
        } = request.body;
    
        if (!nome || !telefone || !cpf || !cep) {
            return response.status(400).send('Preencha todos os campos');
        }

        const telefoneRep = telefone.replace(/\D+/g, "");

        const cpfRep = await hash(cpf.replace(/\D+/g, ""), process.env.BCRYPT_SALT);

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            nome: nome,
            telefone: telefoneRep,
            cpf: cpfRep,
            cep: cep
        })
        .then((user) => {
            delete user.id;
            return response.status(201).send(user);
        })
        .catch((res) => {
            return response.status(res.statusCode).send(res.message);
        });
    }
}

export { CreateUserController }