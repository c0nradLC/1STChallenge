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
            permissions
        } = request.body;

        if (!id || !nome || !telefone || !cep) {
            return response.status(400).send({error: 400, message: 'Preencha todos os campos'});
        }

        const telefoneRep = telefone.replace(/\D+/g, "");

        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        const user = await updateUserUseCase.execute({
            id: id,
            nome: nome,
            telefone: telefoneRep,
            cep: cep,
            permissions: permissions
        })

        return response.status(200).send(user);
    }
}
  
export { UpdateUserController };
  