import "reflect-metadata";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            nome,
            telefone,
            cpf,
            cep,
            logradouro,
            cidade,
            estado
        } = request.body;
    
        if (!nome || !telefone || !cpf || !cep || !logradouro || !cidade || !estado) {
            return response.status(400).send('Preencha todos os campos');
        }

        const createUserUseCase = container.resolve(CreateUserUseCase);
    
        const user = await createUserUseCase.execute({
            nome: nome,
            telefone: telefone,
            cpf: cpf,
            cep: cep,
            logradouro: logradouro,
            cidade: cidade,
            estado: estado,
        });
        delete user.id;
    
        return response.status(201).send(user);
    }
}

export { CreateUserController }