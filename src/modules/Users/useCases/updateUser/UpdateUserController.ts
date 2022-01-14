import "reflect-metadata";
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserUseCase } from './UpdateUserUseCase';

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            id,
            nome,
            telefone,
            cep,
            logradouro,
            cidade,
            estado,
            permissions
        } = request.body;

        if (!id || !nome || !telefone || !cep || !logradouro || !cidade || !estado) {
            return response.status(400).send({error: 400, message: 'Preencha todos os campos'});
        }

        const telefoneRep = telefone.replace(/\D+/g, "");

        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        const user = await updateUserUseCase.execute({
            id: id,
            nome: nome,
            telefone: telefoneRep,
            cep: cep,
            logradouro: logradouro,
            cidade: cidade,
            estado: estado,
            permissions: permissions
        })

        return response.status(200).send(user);
    }
}
  
export { UpdateUserController };
  